import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, phone: true, role: true, avatar: true, location: true, verified: true, createdAt: true }
  });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await request.json();
  const user = await prisma.user.update({
    where: { id: userId },
    data: { name: data.name, phone: data.phone, avatar: data.avatar, location: data.location },
    select: { id: true, email: true, name: true, phone: true, role: true, avatar: true, location: true }
  });

  return NextResponse.json(user);
}
