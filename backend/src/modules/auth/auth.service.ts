import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../../lib/prisma';
import { env } from '../../config/env';
import { AppError } from '../../middlewares/error';
import { LoginInput, RegisterInput, GoogleInput } from './auth.schema';

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
  if (env.ADMIN_REGISTRATION_SECRET) {
    if (inviteCode !== env.ADMIN_REGISTRATION_SECRET) throw new AppError(403, 'Invalid invite code');
  } else {
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

export async function googleAuth({ credential, inviteCode }: GoogleInput) {
  if (!env.GOOGLE_CLIENT_ID) throw new AppError(400, 'Google sign-in is not configured on the server');

  const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({ idToken: credential, audience: env.GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  if (!payload?.email || !payload.email_verified) throw new AppError(401, 'Google account email is not verified');

  const email = payload.email.toLowerCase();
  const name = payload.name || email.split('@')[0];

  let admin = await prisma.adminUser.findUnique({ where: { email } });

  if (!admin) {
    // New admin via Google -> must pass a gate
    const allow = (env.ADMIN_ALLOWED_EMAILS || '')
      .split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
    const count = await prisma.adminUser.count();
    const okBootstrap = count === 0;                                  // first admin ever
    const okAllowlist = allow.includes(email);                        // pre-approved email
    const okInvite = !!env.ADMIN_REGISTRATION_SECRET && inviteCode === env.ADMIN_REGISTRATION_SECRET;
    if (!okBootstrap && !okAllowlist && !okInvite) {
      throw new AppError(403, 'This Google account is not allowed to register as an admin');
    }
    // Google users authenticate via Google; store an unusable random password hash.
    const passwordHash = await bcrypt.hash(randomUUID(), 10);
    admin = await prisma.adminUser.create({ data: { email, name, passwordHash } });
  }

  return { token: signToken(admin), admin: { id: admin.id, email: admin.email, name: admin.name } };
}
