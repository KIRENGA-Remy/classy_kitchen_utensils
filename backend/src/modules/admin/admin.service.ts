import { prisma } from '../../lib/prisma';
import { AppError } from '../../middlewares/error';
import { ProductInput } from './admin.schema';

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function listAllProducts() {
  return prisma.product.findMany({
    include: { category: true, images: { orderBy: { position: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  });
}

export function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true, images: { orderBy: { position: 'asc' } } },
  });
}

export function listAdminCategories() {
  return prisma.category.findMany({
    select: { id: true, slug: true, nameEn: true, nameRw: true },
    orderBy: { position: 'asc' },
  });
}

async function resolveCategoryId(slug: string) {
  const cat = await prisma.category.findUnique({ where: { slug } });
  if (!cat) throw new AppError(400, `Unknown category: ${slug}`);
  return cat.id;
}

export async function createProduct(input: ProductInput) {
  const categoryId = await resolveCategoryId(input.categorySlug);
  let slug = slugify(input.nameEn);
  if (await prisma.product.findUnique({ where: { slug } })) slug = `${slug}-${Date.now().toString(36)}`;

  return prisma.product.create({
    data: {
      slug, nameEn: input.nameEn, nameRw: input.nameRw,
      descriptionEn: input.descriptionEn, descriptionRw: input.descriptionRw,
      priceRwf: input.priceRwf, oldPriceRwf: input.oldPriceRwf ?? null,
      colors: input.colors, stock: input.stock,
      isActive: input.isActive, isFeatured: input.isFeatured,
      categoryId,
      images: { create: input.images.map((url, i) => ({ url, position: i, alt: input.nameEn })) },
    },
    include: { images: true },
  });
}

export async function updateProduct(id: string, input: ProductInput) {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Product not found');
  const categoryId = await resolveCategoryId(input.categorySlug);

  // Replace images wholesale (simple + predictable for an admin form).
  await prisma.productImage.deleteMany({ where: { productId: id } });

  return prisma.product.update({
    where: { id },
    data: {
      nameEn: input.nameEn, nameRw: input.nameRw,
      descriptionEn: input.descriptionEn, descriptionRw: input.descriptionRw,
      priceRwf: input.priceRwf, oldPriceRwf: input.oldPriceRwf ?? null,
      colors: input.colors, stock: input.stock,
      isActive: input.isActive, isFeatured: input.isFeatured,
      categoryId,
      images: { create: input.images.map((url, i) => ({ url, position: i, alt: input.nameEn })) },
    },
    include: { images: true },
  });
}

export async function deleteProduct(id: string) {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Product not found');
  await prisma.product.delete({ where: { id } }); // images cascade-delete
}
