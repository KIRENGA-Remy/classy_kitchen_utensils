import { prisma } from '../../lib/prisma';
import { AppError } from '../../middlewares/error';
import { ProductInput, CategoryInput } from './admin.schema';

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

// Returns categories WITH how many products each holds (used by the admin UI).
export async function listAdminCategories() {
  const cats = await prisma.category.findMany({
    orderBy: { position: 'asc' },
    include: { _count: { select: { products: true } } },
  });
  return cats.map((c) => ({
    id: c.id, slug: c.slug, nameEn: c.nameEn, nameRw: c.nameRw,
    position: c.position, productCount: c._count.products,
  }));
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
  await prisma.product.delete({ where: { id } });
}

// ----- Category CRUD -----
export async function createCategory(input: CategoryInput) {
  const slug = (input.slug?.trim() || slugify(input.nameEn));
  if (!slug) throw new AppError(400, 'Category name is required');
  if (await prisma.category.findUnique({ where: { slug } })) throw new AppError(409, `Category slug already exists: ${slug}`);
  const last = await prisma.category.findFirst({ orderBy: { position: 'desc' } });
  const position = (last?.position ?? 0) + 1;
  return prisma.category.create({ data: { slug, nameEn: input.nameEn, nameRw: input.nameRw, position } });
}

export async function updateCategory(id: string, input: CategoryInput) {
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Category not found');
  const slug = input.slug?.trim() || existing.slug;
  if (slug !== existing.slug && await prisma.category.findUnique({ where: { slug } })) {
    throw new AppError(409, `Category slug already exists: ${slug}`);
  }
  return prisma.category.update({ where: { id }, data: { nameEn: input.nameEn, nameRw: input.nameRw, slug } });
}

export async function deleteCategory(id: string) {
  const existing = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  });
  if (!existing) throw new AppError(404, 'Category not found');
  if (existing._count.products > 0) {
    throw new AppError(409, `This category still has ${existing._count.products} product(s). Reassign or remove them first.`);
  }
  await prisma.category.delete({ where: { id } });
}

// Move every product from one category to another (then the source can be deleted).
export async function reassignCategoryProducts(fromId: string, toSlug: string) {
  const from = await prisma.category.findUnique({ where: { id: fromId } });
  if (!from) throw new AppError(404, 'Source category not found');
  const to = await prisma.category.findUnique({ where: { slug: toSlug } });
  if (!to) throw new AppError(400, `Unknown target category: ${toSlug}`);
  if (to.id === fromId) throw new AppError(400, 'Choose a different target category');
  const result = await prisma.product.updateMany({ where: { categoryId: fromId }, data: { categoryId: to.id } });
  return { moved: result.count, toSlug: to.slug };
}
