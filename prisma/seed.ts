import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sellers
  const sellers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'apple@store.com',
        name: 'Apple Store',
        phone: '+1234567890'
      }
    }),
    prisma.user.create({
      data: {
        email: 'samsung@store.com',
        name: 'Samsung Store',
        phone: '+1234567891'
      }
    }),
    prisma.user.create({
      data: {
        email: 'techworld@store.com',
        name: 'Tech World',
        phone: '+1234567892'
      }
    })
  ]);

  // Create products
  await Promise.all([
    prisma.product.create({
      data: {
        title: 'iPhone 15 Pro Max',
        description: 'Latest iPhone with titanium design',
        price: 1199,
        category: 'phones',
        images: JSON.stringify(['/api/placeholder/400/300']),
        sellerId: sellers[0].id,
        stock: 50
      }
    }),
    prisma.product.create({
      data: {
        title: 'Samsung Galaxy S24 Ultra',
        description: 'Premium Android phone with S Pen',
        price: 1299,
        category: 'phones',
        images: JSON.stringify(['/api/placeholder/400/300']),
        sellerId: sellers[1].id,
        stock: 30
      }
    }),
    prisma.product.create({
      data: {
        title: 'MacBook Air M3',
        description: 'Ultra-thin laptop with M3 chip',
        price: 1099,
        category: 'gadgets',
        images: JSON.stringify(['/api/placeholder/400/300']),
        sellerId: sellers[0].id,
        stock: 25
      }
    }),
    prisma.product.create({
      data: {
        title: 'Gaming Laptop',
        description: 'High-performance gaming laptop',
        price: 899,
        category: 'gadgets',
        images: JSON.stringify(['/api/placeholder/400/300']),
        sellerId: sellers[2].id,
        stock: 15
      }
    }),
    prisma.product.create({
      data: {
        title: 'Ice Cube Maker',
        description: 'Portable ice cube maker for home and office',
        price: 89,
        category: 'gadgets',
        images: JSON.stringify(['/api/placeholder/400/300']),
        sellerId: sellers[2].id,
        stock: 40
      }
    })
  ]);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });