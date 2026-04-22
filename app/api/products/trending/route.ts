import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';

    const products = await prisma.product.findMany({
      include: { seller: true },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const trendingProducts = products.map(product => ({
      ...product,
      images: JSON.parse(product.images),
      views: Math.floor(Math.random() * 2000) + 500,
      favorites: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({ id: `${i + 1}` }))
    }));

    return NextResponse.json(trendingProducts);
  } catch (error) {
    console.error('Trending API error:', error);
    return NextResponse.json([], { status: 200 });
  }
}