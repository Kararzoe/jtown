import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { product: true, buyer: true }
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([
      {
        id: '1',
        status: 'completed',
        total: 999,
        createdAt: new Date(),
        product: { title: 'iPhone 14 Pro', price: 999 },
        buyer: { name: 'John Doe' }
      }
    ]);
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    const order = await prisma.order.create({
      data: {
        ...data,
        buyerId: data.buyerId || '1'
      }
    });
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}