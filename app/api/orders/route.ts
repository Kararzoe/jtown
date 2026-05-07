import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const orders = await prisma.order.findMany({
      where: { buyerId: userId },
      include: {
        product: { include: { seller: { select: { name: true } } } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await request.json();
    if (!data.productId || !data.quantity) {
      return NextResponse.json({ error: 'Product and quantity required' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: data.productId } });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    if (product.stock < data.quantity) return NextResponse.json({ error: 'Not enough stock' }, { status: 400 });

    const order = await prisma.order.create({
      data: {
        buyerId: userId,
        productId: data.productId,
        quantity: data.quantity,
        total: product.price * data.quantity,
        address: data.address || null,
      }
    });

    // Reduce stock
    await prisma.product.update({
      where: { id: data.productId },
      data: { stock: { decrement: data.quantity } }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Orders POST error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
