import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Get or create a default admin user to attach the provider to
    let adminUser = await prisma.user.findFirst({ where: { role: 'admin' } });
    if (!adminUser) {
      adminUser = await prisma.user.findFirst();
    }
    if (!adminUser) {
      return NextResponse.json({ error: 'No users exist' }, { status: 400 });
    }

    const provider = await prisma.serviceProvider.create({
      data: {
        serviceName: data.serviceName,
        category: data.category,
        description: data.description,
        location: data.location || 'Jos',
        phone: data.phone,
        experience: data.experience || null,
        priceRange: data.priceRange || null,
        userId: adminUser.id,
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
