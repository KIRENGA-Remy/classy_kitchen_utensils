import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Validate and TYPE the request body. On success req.body is the parsed,
// trusted data; on failure the ZodError is forwarded to the error handler.
export const validateBody =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return next(result.error);
    req.body = result.data;
    next();
  };
