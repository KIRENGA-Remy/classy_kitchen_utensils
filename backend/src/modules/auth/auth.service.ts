import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';
import { env } from '../../config/env';
import { AppError } from '../../middlewares/error';
import { LoginInput } from './auth.schema';

export async function login({ email, password }: LoginInput) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  // Same error whether the email or the password is wrong (avoids leaking which).
  if (!admin) throw new AppError(401, 'Invalid email or password');
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) throw new AppError(401, 'Invalid email or password');

  const token = jwt.sign({ sub: admin.id, email: admin.email }, env.JWT_SECRET, { expiresIn: '7d' });
  return { token, admin: { id: admin.id, email: admin.email, name: admin.name } };
}
