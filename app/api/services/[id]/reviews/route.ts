import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const provider = await prisma.serviceProvider.findUnique({
      where: { id: params.id },
      include: { user: { select: { name: true } } }
    });
    if (!provider) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Get reviews for products by this provider's user
    const reviews = await prisma.review.findMany({
      where: { product: { sellerId: provider.userId } },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ provider, reviews });
  } catch {
    return NextResponse.json({ provider: null, reviews: [] });
  }
}
