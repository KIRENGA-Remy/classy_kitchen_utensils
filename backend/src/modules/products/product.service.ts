import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { ListQuery } from './product.schema';

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

  // Run count + page in parallel. `include` avoids the N+1 query problem.
  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      include: { category: true, images: { orderBy: { position: 'asc' } } },
      orderBy: { createdAt: 'desc' },
      skip: (q.page - 1) * q.pageSize,
      take: q.pageSize,
    }),
  ]);

  return { total, page: q.page, pageSize: q.pageSize, items };
}

export function getProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: { slug, isActive: true },
    include: { category: true, images: { orderBy: { position: 'asc' } } },
  });
}
