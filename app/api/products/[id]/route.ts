import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
      include: {
        seller: { select: { id: true, name: true, avatar: true, location: true } },
        reviews: { include: { user: { select: { name: true, avatar: true } } }, orderBy: { createdAt: 'desc' } }
      }
    });

    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ ...product, images: JSON.parse(product.images) });
  } catch {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product || product.sellerId !== userId) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const data = await request.json();
  const updated = await prisma.product.update({
    where: { id: params.id },
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      images: data.images ? JSON.stringify(data.images) : undefined,
      stock: data.stock,
    }
  });

  return NextResponse.json({ ...updated, images: JSON.parse(updated.images) });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product || product.sellerId !== userId) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
