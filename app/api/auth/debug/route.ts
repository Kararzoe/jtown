import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';

export async function GET() {
  try {
    const count = await prisma.user.count();
    const hash = hashPassword('test123');
    const token = generateToken('test-id');

    const user = await prisma.user.create({
      data: {
        email: `debug-${Date.now()}@test.com`,
        password: hash,
        name: 'Debug User',
      }
    });

    await prisma.user.delete({ where: { id: user.id } });

    return NextResponse.json({ success: true, userCount: count, hashWorks: !!hash, tokenWorks: !!token, createWorks: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, name: error.name, code: error.code });
  }
}
