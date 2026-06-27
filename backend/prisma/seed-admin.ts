import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@classykitchen.rw';
  const password = process.env.ADMIN_PASSWORD ?? 'changeme1234';
  const name = process.env.ADMIN_NAME ?? 'Store Admin';

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });
  console.log(`Admin ready: ${email}  (password from ADMIN_PASSWORD env)`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
