import { Request, Response, NextFunction } from 'express';
import { listProducts, getProductBySlug, getSimilarProducts } from './product.service';
import { listQuerySchema } from './product.schema';
import { getLang, localizeProduct } from '../../utils/i18n';
import { AppError } from '../../middlewares/error';

export async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const q = listQuerySchema.parse(req.query);
    const lang = getLang(req);
    const result = await listProducts(q);
    res.json({
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      items: result.items.map((p) => localizeProduct(p, lang)),
    });
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const lang = getLang(req);
    const product = await getProductBySlug(req.params.slug);
    if (!product) throw new AppError(404, 'Product not found');

    const similarRaw = product.category
      ? await getSimilarProducts(product.category.slug, product.slug)
      : [];

    res.json({
      ...localizeProduct(product, lang),
      reviews: (product as any).reviews ?? [],
      similar: similarRaw.map((p) => localizeProduct(p, lang)),
    });
  } catch (err) {
    next(err);
  }
}
