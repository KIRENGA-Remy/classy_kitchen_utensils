import { Request, Response, NextFunction } from 'express';
import { login } from './auth.service';

export async function postLogin(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await login(req.body));
  } catch (err) {
    next(err);
  }
}
