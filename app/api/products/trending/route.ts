import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const products = await prisma.product.findMany({
      where: { status: 'active' },
      include: { seller: { select: { id: true, name: true } } },
      orderBy: { views: 'desc' },
      take: 10
    });

    const formatted = products.map(p => ({
      ...p,
      _id: p.id,
      images: JSON.parse(p.images),
      favorites: []
    }));

    return NextResponse.json(formatted);
  } catch {
    return NextResponse.json([]);
  }
}
