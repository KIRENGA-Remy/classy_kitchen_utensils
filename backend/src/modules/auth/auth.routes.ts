import { Router } from 'express';
import { postLogin, postRegister } from './auth.controller';
import { validateBody } from '../../middlewares/validate';
import { loginSchema, registerSchema } from './auth.schema';

const router = Router();
router.post('/login', validateBody(loginSchema), postLogin);
router.post('/register', validateBody(registerSchema), postRegister);
export default router;
