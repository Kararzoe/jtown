import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = bcrypt.hashSync('Ojonsman122.', 10);

  await prisma.user.create({
    data: {
      email: 'admin@josmkt.com.ng',
      password,
      name: 'JosMKT Admin',
      role: 'admin',
      verified: true,
    }
  });

  console.log('Admin user created. Database is clean - no demo data.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
