import { Request, Response, NextFunction } from 'express';
import { login, register } from './auth.service';

export async function postLogin(req: Request, res: Response, next: NextFunction) {
  try { res.json(await login(req.body)); } catch (err) { next(err); }
}
export async function postRegister(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json(await register(req.body)); } catch (err) { next(err); }
}
