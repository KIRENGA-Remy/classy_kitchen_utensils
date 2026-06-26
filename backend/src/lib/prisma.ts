import { PrismaClient } from '@prisma/client';

// One shared PrismaClient for the whole app. Creating many clients exhausts
// the database connection pool — a classic, hard-to-debug production bottleneck.
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});
