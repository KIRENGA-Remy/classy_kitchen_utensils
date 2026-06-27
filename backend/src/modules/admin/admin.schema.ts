import { z } from 'zod';

export const productInputSchema = z.object({
  nameEn: z.string().min(2),
  nameRw: z.string().min(2),
  descriptionEn: z.string().default(''),
  descriptionRw: z.string().default(''),
  categorySlug: z.string().min(1),
  priceRwf: z.number().int().min(0),
  oldPriceRwf: z.number().int().min(0).nullable().optional(),
  colors: z.array(z.string()).default([]),
  stock: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  images: z.array(z.string().url()).default([]),
});
export type ProductInput = z.infer<typeof productInputSchema>;
