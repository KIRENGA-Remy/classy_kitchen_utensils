import { Router } from 'express';
import { requireAdmin } from '../../middlewares/auth';
import {
  getAll, getOne, getCategories, create, update, remove,
  createCat, updateCat, removeCat, reassignCat,
} from './admin.controller';

const router = Router();
router.use(requireAdmin);

// categories
router.get('/categories', getCategories);
router.post('/categories', createCat);
router.put('/categories/:id', updateCat);
router.delete('/categories/:id', removeCat);
router.post('/categories/:id/reassign', reassignCat);

// products
router.get('/products', getAll);
router.get('/products/:id', getOne);
router.post('/products', create);
router.put('/products/:id', update);
router.delete('/products/:id', remove);

export default router;
