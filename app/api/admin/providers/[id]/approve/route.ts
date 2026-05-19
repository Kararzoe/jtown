import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.serviceProvider.update({
      where: { id: params.id },
      data: { approved: true, verified: true }
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to approve provider' }, { status: 500 });
  }
}
