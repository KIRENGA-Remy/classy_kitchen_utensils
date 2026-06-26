import { Request, Response, NextFunction } from 'express';
import { listCategories } from './category.service';
import { getLang, localizeCategory } from '../../utils/i18n';

export async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const lang = getLang(req);
    const categories = await listCategories();
    res.json(categories.map((c) => localizeCategory(c, lang)));
  } catch (err) {
    next(err);
  }
}
