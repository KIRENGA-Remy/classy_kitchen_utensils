import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),

  // This API's own public URL — used to build absolute image URLs for local uploads.
  PUBLIC_BASE_URL: z.string().default('http://localhost:4000'),

  // Initial admin account (created by `npm run seed:admin`). Change the password!
  ADMIN_EMAIL: z.string().email().default('admin@classykitchen.rw'),
  ADMIN_PASSWORD: z.string().min(8).default('changeme1234'),
  ADMIN_NAME: z.string().default('Store Admin'),

  // Optional: set this to push uploads to Cloudinary instead of local disk.
  CLOUDINARY_URL: z.string().optional(),

  
  // If set, admin sign-up requires this invite code. If unset, sign-up is allowed
  // only while NO admin exists yet (first-run bootstrap), then disabled.
  ADMIN_REGISTRATION_SECRET: z.string().optional(),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error('Invalid environment variables:\n', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
