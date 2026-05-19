import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ success: true, message: 'Already subscribed' });

    await prisma.subscriber.create({ data: { email } });
    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(subscribers);
  } catch {
    return NextResponse.json([]);
  }
}
