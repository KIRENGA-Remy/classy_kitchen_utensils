import { Router } from 'express';
import { postOrder } from './order.controller';
import { validateBody } from '../../middlewares/validate';
import { createOrderSchema } from './order.schema';

const router = Router();
router.post('/', validateBody(createOrderSchema), postOrder);
export default router;
