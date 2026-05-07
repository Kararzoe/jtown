import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [users, products, orders, providers] = await Promise.all([
      prisma.user.count(),
      prisma.product.count({ where: { status: 'active' } }),
      prisma.order.count(),
      prisma.serviceProvider.count({ where: { approved: true } }),
    ]);

    return NextResponse.json({ users, products, orders, providers });
  } catch {
    return NextResponse.json({ users: 0, products: 0, orders: 0, providers: 0 });
  }
}
