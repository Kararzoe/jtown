import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: any = { approved: true };
    if (category) where.category = category;

    const providers = await prisma.serviceProvider.findMany({
      where,
      include: { user: { select: { name: true, avatar: true } } },
      orderBy: { rating: 'desc' }
    });

    return NextResponse.json(providers);
  } catch (error) {
    console.error('Services GET error:', error);
    return NextResponse.json([]);
  }
}
