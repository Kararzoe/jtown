import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = bcrypt.hashSync('password123', 10);

  const sellers = await Promise.all([
    prisma.user.create({
      data: { email: 'apple@store.com', password, name: 'Apple Store', phone: '+1234567890', role: 'seller', verified: true }
    }),
    prisma.user.create({
      data: { email: 'samsung@store.com', password, name: 'Samsung Store', phone: '+1234567891', role: 'seller', verified: true }
    }),
    prisma.user.create({
      data: { email: 'techworld@store.com', password, name: 'Tech World', phone: '+1234567892', role: 'seller', verified: true, location: 'Jos, Nigeria' }
    }),
  ]);

  // Admin user
  await prisma.user.create({
    data: { email: 'admin@josmkt.com', password: bcrypt.hashSync('admin123', 10), name: 'Admin', role: 'admin', verified: true }
  });

  // Products
  await Promise.all([
    prisma.product.create({ data: { title: 'iPhone 15 Pro Max', description: 'Latest iPhone with titanium design', price: 1199, category: 'phones', images: JSON.stringify(['/api/placeholder/400/300']), sellerId: sellers[0].id, stock: 50 } }),
    prisma.product.create({ data: { title: 'Samsung Galaxy S24 Ultra', description: 'Premium Android phone with S Pen', price: 1299, category: 'phones', images: JSON.stringify(['/api/placeholder/400/300']), sellerId: sellers[1].id, stock: 30 } }),
    prisma.product.create({ data: { title: 'MacBook Air M3', description: 'Ultra-thin laptop with M3 chip', price: 1099, category: 'gadgets', images: JSON.stringify(['/api/placeholder/400/300']), sellerId: sellers[0].id, stock: 25 } }),
    prisma.product.create({ data: { title: 'Gaming Laptop', description: 'High-performance gaming laptop', price: 899, category: 'gadgets', images: JSON.stringify(['/api/placeholder/400/300']), sellerId: sellers[2].id, stock: 15 } }),
    prisma.product.create({ data: { title: 'Ice Cube Maker', description: 'Portable ice cube maker for home and office', price: 89, category: 'gadgets', images: JSON.stringify(['/api/placeholder/400/300']), sellerId: sellers[2].id, stock: 40 } }),
  ]);

  // Service Providers
  await Promise.all([
    prisma.serviceProvider.create({ data: { serviceName: 'Quick Fix Plumbing', category: 'plumbing', description: 'Professional plumbing services', location: 'Bukuru, Jos', phone: '+2349012345678', experience: '5 years', priceRange: '₦5,000 - ₦50,000', userId: sellers[2].id, approved: true, verified: true, rating: 4.5 } }),
    prisma.serviceProvider.create({ data: { serviceName: 'PowerUp Electricals', category: 'electrical', description: 'Electrical installations and repairs', location: 'Terminus, Jos', phone: '+2349087654321', experience: '8 years', priceRange: '₦3,000 - ₦100,000', userId: sellers[1].id, approved: true, verified: true, rating: 4.8 } }),
  ]);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
