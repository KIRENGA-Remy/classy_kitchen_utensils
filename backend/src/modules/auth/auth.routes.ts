import { Router } from 'express';
import { postLogin, postRegister, postGoogle } from './auth.controller';
import { validateBody } from '../../middlewares/validate';
import { loginSchema, registerSchema, googleSchema } from './auth.schema';

const router = Router();
router.post('/login', validateBody(loginSchema), postLogin);
router.post('/register', validateBody(registerSchema), postRegister);
router.post('/google', validateBody(googleSchema), postGoogle);
export default router;
