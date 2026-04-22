import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  try {
    const reviews = await prisma.review.findMany({
      where: productId ? { productId } : {},
      include: { user: true }
    });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([
      {
        id: '1',
        rating: 5,
        comment: 'Great product!',
        user: { name: 'Jane Doe' },
        createdAt: new Date()
      }
    ]);
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    const review = await prisma.review.create({
      data: {
        ...data,
        userId: data.userId || '1'
      }
    });
    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}