import { z } from 'zod';

// Query params for listing products (all optional, with safe defaults).
export const listQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  featured: z.preprocess((v) => v === 'true' || v === true, z.boolean()).optional(),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(48).default(12),
});
export type ListQuery = z.infer<typeof listQuerySchema>;
