import { Request, Response, NextFunction } from 'express';
import { saveImage } from './upload.service';
import { AppError } from '../../middlewares/error';

export async function postUpload(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) throw new AppError(400, 'No file uploaded');
    const url = await saveImage(req.file);
    res.status(201).json({ url });
  } catch (err) {
    next(err);
  }
}
