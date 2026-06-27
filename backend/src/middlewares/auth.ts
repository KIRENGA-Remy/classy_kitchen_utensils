import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from './error';

export interface AuthedRequest extends Request {
  admin?: { id: string; email: string };
}

// Gate admin-only routes. Expects "Authorization: Bearer <token>".
export function requireAdmin(req: AuthedRequest, _res: Response, next: NextFunction) {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return next(new AppError(401, 'Not authenticated'));
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string; email: string };
    req.admin = { id: payload.sub, email: payload.email };
    next();
  } catch {
    next(new AppError(401, 'Invalid or expired token'));
  }
}
