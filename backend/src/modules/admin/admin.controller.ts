import { Request, Response, NextFunction } from 'express';
import {
  listAllProducts, getProductById, listAdminCategories,
  createProduct, updateProduct, deleteProduct,
  createCategory, updateCategory, deleteCategory, reassignCategoryProducts,
} from './admin.service';
import { productInputSchema, categoryInputSchema, reassignSchema } from './admin.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await listAllProducts()); } catch (e) { next(e); }
}
export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const p = await getProductById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  } catch (e) { next(e); }
}
export async function getCategories(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await listAdminCategories()); } catch (e) { next(e); }
}
export async function create(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json(await createProduct(productInputSchema.parse(req.body))); } catch (e) { next(e); }
}
export async function update(req: Request, res: Response, next: NextFunction) {
  try { res.json(await updateProduct(req.params.id, productInputSchema.parse(req.body))); } catch (e) { next(e); }
}
export async function remove(req: Request, res: Response, next: NextFunction) {
  try { await deleteProduct(req.params.id); res.json({ ok: true }); } catch (e) { next(e); }
}

export async function createCat(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json(await createCategory(categoryInputSchema.parse(req.body))); } catch (e) { next(e); }
}
export async function updateCat(req: Request, res: Response, next: NextFunction) {
  try { res.json(await updateCategory(req.params.id, categoryInputSchema.parse(req.body))); } catch (e) { next(e); }
}
export async function removeCat(req: Request, res: Response, next: NextFunction) {
  try { await deleteCategory(req.params.id); res.json({ ok: true }); } catch (e) { next(e); }
}
export async function reassignCat(req: Request, res: Response, next: NextFunction) {
  try { res.json(await reassignCategoryProducts(req.params.id, reassignSchema.parse(req.body).toSlug)); } catch (e) { next(e); }
}
