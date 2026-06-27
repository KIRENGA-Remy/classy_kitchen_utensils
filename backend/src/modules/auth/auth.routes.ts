import { Router } from 'express';
import { postLogin } from './auth.controller';
import { validateBody } from '../../middlewares/validate';
import { loginSchema } from './auth.schema';

const router = Router();
router.post('/login', validateBody(loginSchema), postLogin);
export default router;
