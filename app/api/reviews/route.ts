import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    const reviews = await prisma.review.findMany({
      where: productId ? { productId } : {},
      include: { user: { select: { name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await request.json();
    if (!data.productId || !data.rating) {
      return NextResponse.json({ error: 'Product and rating required' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment || null,
        userId,
        productId: data.productId,
      },
      include: { user: { select: { name: true, avatar: true } } }
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Review POST error:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
