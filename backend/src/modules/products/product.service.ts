import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { ListQuery } from './product.schema';

function orderByFor(sort: ListQuery['sort']): Prisma.ProductOrderByWithRelationInput {
  switch (sort) {
    case 'price_asc': return { priceRwf: 'asc' };
    case 'price_desc': return { priceRwf: 'desc' };
    default: return { createdAt: 'desc' };
  }
}

export async function listProducts(q: ListQuery) {
  const where: Prisma.ProductWhereInput = { isActive: true };
  if (q.category) where.category = { slug: q.category };
  if (q.featured) where.isFeatured = true;
  if (q.search) {
    where.OR = [
      { nameEn: { contains: q.search, mode: 'insensitive' } },
      { nameRw: { contains: q.search, mode: 'insensitive' } },
    ];
  }

  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      include: { category: true, images: { orderBy: { position: 'asc' } } },
      orderBy: orderByFor(q.sort),
      skip: (q.page - 1) * q.pageSize,
      take: q.pageSize,
    }),
  ]);

  return { total, page: q.page, pageSize: q.pageSize, items };
}

export function getProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: { slug, isActive: true },
    include: {
      category: true,
      images: { orderBy: { position: 'asc' } },
      reviews: { orderBy: { createdAt: 'desc' }, take: 10 },
    },
  });
}

// "Similar items": same category, excluding the current product.
export function getSimilarProducts(categorySlug: string, excludeSlug: string) {
  return prisma.product.findMany({
    where: { isActive: true, category: { slug: categorySlug }, slug: { not: excludeSlug } },
    include: { category: true, images: { orderBy: { position: 'asc' } } },
    take: 8,
    orderBy: { createdAt: 'desc' },
  });
}
