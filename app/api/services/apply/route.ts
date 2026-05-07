import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await request.json();
    if (!data.serviceName || !data.category || !data.description || !data.location || !data.phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const provider = await prisma.serviceProvider.create({
      data: {
        serviceName: data.serviceName,
        category: data.category,
        description: data.description,
        location: data.location,
        phone: data.phone,
        priceRange: data.priceRange || null,
        experience: data.experience || null,
        userId,
      }
    });

    return NextResponse.json({ success: true, provider });
  } catch (error) {
    console.error('Service apply error:', error);
    return NextResponse.json({ error: 'Application failed' }, { status: 500 });
  }
}
