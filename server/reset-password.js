import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: 'admin@gmail.com', password: 'admin123' },
    { email: 'sales@gmail.com', password: 'sales123' },
    { email: 'warehouse@gmail.com', password: 'warehouse123' },
    { email: 'accounts@gmail.com', password: 'accounts123' },
  ];

  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    await prisma.user.update({
      where: { email: u.email },
      data: { password: hash },
    });
    console.log(`Updated: ${u.email} -> ${u.password}`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());