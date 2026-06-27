import { Router } from 'express';
import { requireAdmin } from '../../middlewares/auth';
import { getAll, getOne, getCategories, create, update, remove } from './admin.controller';

const router = Router();
router.use(requireAdmin); // everything below requires a valid admin token

router.get('/categories', getCategories);
router.get('/products', getAll);
router.get('/products/:id', getOne);
router.post('/products', create);
router.put('/products/:id', update);
router.delete('/products/:id', remove);

export default router;
