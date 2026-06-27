import { z } from 'zod';

export const listQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  featured: z.preprocess((v) => v === 'true' || v === true, z.boolean()).optional(),
  sort: z.enum(['newest', 'price_asc', 'price_desc']).default('newest'),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(48).default(12),
});
export type ListQuery = z.infer<typeof listQuerySchema>;
