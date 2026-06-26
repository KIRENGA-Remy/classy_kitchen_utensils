import { prisma } from '../../lib/prisma';
import { AppError } from '../../middlewares/error';
import { CreateOrderInput } from './order.schema';

function makeReference() {
  return 'CKU-' + Date.now().toString(36).toUpperCase();
}

export async function createOrder(input: CreateOrderInput) {
  // SECURITY: never trust prices from the client. Look up every product by
  // slug and compute the total from the DB. The browser only sends quantities.
  const slugs = input.items.map((i) => i.slug);
  const products = await prisma.product.findMany({
    where: { slug: { in: slugs }, isActive: true },
  });

  const lineItems = input.items.map((i) => {
    const product = products.find((p) => p.slug === i.slug);
    if (!product) throw new AppError(400, `Product not available: ${i.slug}`);
    if (product.stock < i.quantity) throw new AppError(400, `Not enough stock for ${product.nameEn}`);
    return {
      productId: product.id,
      nameEn: product.nameEn,
      unitPriceRwf: product.priceRwf,
      quantity: i.quantity,
    };
  });

  const totalRwf = lineItems.reduce((sum, li) => sum + li.unitPriceRwf * li.quantity, 0);

  const order = await prisma.order.create({
    data: {
      reference: makeReference(),
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      deliveryNote: input.deliveryNote,
      totalRwf,
      paymentMethod: input.paymentMethod,
      items: { create: lineItems },
    },
    include: { items: true },
  });

  return order;
}
