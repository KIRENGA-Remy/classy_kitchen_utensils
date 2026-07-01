import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),

  PUBLIC_BASE_URL: z.string().default('http://localhost:4000'),

  ADMIN_EMAIL: z.string().email().default('admin@classykitchen.rw'),
  ADMIN_PASSWORD: z.string().min(8).default('changeme1234'),
  ADMIN_NAME: z.string().default('Store Admin'),

  CLOUDINARY_URL: z.string().optional(),

  // Password sign-up gating (existing feature)
  ADMIN_REGISTRATION_SECRET: z.string().optional(),

  // Google sign-in (optional). Set GOOGLE_CLIENT_ID to enable /api/auth/google.
  GOOGLE_CLIENT_ID: z.string().optional(),
  // Comma-separated emails allowed to become admins via Google (besides first-run bootstrap).
  ADMIN_ALLOWED_EMAILS: z.string().optional(),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error('Invalid environment variables:\n', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
