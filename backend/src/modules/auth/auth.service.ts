import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';
import { env } from '../../config/env';
import { AppError } from '../../middlewares/error';
import { LoginInput, RegisterInput } from './auth.schema';

function signToken(admin: { id: string; email: string }) {
  return jwt.sign({ sub: admin.id, email: admin.email }, env.JWT_SECRET, { expiresIn: '7d' });
}

export async function login({ email, password }: LoginInput) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) throw new AppError(401, 'Invalid email or password');
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) throw new AppError(401, 'Invalid email or password');
  return { token: signToken(admin), admin: { id: admin.id, email: admin.email, name: admin.name } };
}

export async function register({ email, name, password, inviteCode }: RegisterInput) {
  // Gating: never leave admin sign-up wide open.
  if (env.ADMIN_REGISTRATION_SECRET) {
    if (inviteCode !== env.ADMIN_REGISTRATION_SECRET) throw new AppError(403, 'Invalid invite code');
  } else {
    // No secret configured -> only allow creating the very first admin.
    const count = await prisma.adminUser.count();
    if (count > 0) throw new AppError(403, 'Sign-up is disabled. Ask an existing admin for an invite code.');
  }

  if (await prisma.adminUser.findUnique({ where: { email } })) {
    throw new AppError(409, 'An admin with that email already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await prisma.adminUser.create({ data: { email, name, passwordHash } });
  return { token: signToken(admin), admin: { id: admin.id, email: admin.email, name: admin.name } };
}
