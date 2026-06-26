import { Request } from 'express';

export type Lang = 'en' | 'rw';

// Pick the response language from ?lang=, then Accept-Language, default 'en'.
export function getLang(req: Request): Lang {
  const q = String(req.query.lang ?? '').toLowerCase();
  if (q === 'rw' || q === 'en') return q;
  const header = (req.headers['accept-language'] ?? '').toLowerCase();
  return header.startsWith('rw') ? 'rw' : 'en';
}

export function localizeCategory(c: any, lang: Lang) {
  return { slug: c.slug, name: lang === 'rw' ? c.nameRw : c.nameEn };
}

export function localizeProduct(p: any, lang: Lang) {
  return {
    id: p.id,
    slug: p.slug,
    name: lang === 'rw' ? p.nameRw : p.nameEn,
    description: lang === 'rw' ? p.descriptionRw : p.descriptionEn,
    priceRwf: p.priceRwf,
    stock: p.stock,
    isFeatured: p.isFeatured,
    category: p.category ? localizeCategory(p.category, lang) : undefined,
    images: (p.images ?? []).map((i: any) => ({ url: i.url, alt: i.alt })),
  };
}
