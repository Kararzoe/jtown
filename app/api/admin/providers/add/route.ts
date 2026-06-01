import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function POST(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const data = await request.json();
    const provider = await prisma.serviceProvider.create({
      data: {
        serviceName: data.serviceName,
        category: data.category,
        description: data.description,
        location: data.location || 'Jos',
        phone: data.phone,
        experience: data.experience || null,
        priceRange: data.priceRange || null,
        image: data.image || null,
        userId: userId,
        approved: true,
        verified: true,
      }
    });
    return NextResponse.json(provider);
  } catch (error) {
    console.error('Add provider error:', error);
    return NextResponse.json({ error: 'Failed to add provider' }, { status: 500 });
  }
}
