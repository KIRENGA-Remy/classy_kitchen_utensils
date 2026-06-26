import { z } from 'zod';

export const createOrderSchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().min(8),         // local format validated on client
  customerEmail: z.string().email().optional(),
  deliveryNote: z.string().max(500).optional(),
  paymentMethod: z.enum(['MTN_MOMO', 'AIRTEL_MONEY', 'CASH_ON_DELIVERY']),
  items: z
    .array(z.object({ slug: z.string(), quantity: z.number().int().min(1).max(99) }))
    .min(1, 'Cart cannot be empty'),
});
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
