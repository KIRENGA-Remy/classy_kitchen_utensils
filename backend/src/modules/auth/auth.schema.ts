import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  inviteCode: z.string().optional(),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const googleSchema = z.object({
  credential: z.string().min(10),      // Google ID token from the client
  inviteCode: z.string().optional(),
});
export type GoogleInput = z.infer<typeof googleSchema>;
