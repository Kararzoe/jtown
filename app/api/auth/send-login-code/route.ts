import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateCode, sendVerificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'No account found with this email' }, { status: 404 });
    }

    if (!user.verified) {
      return NextResponse.json({ error: 'Please verify your email first by signing up again' }, { status: 400 });
    }

    const code = generateCode();
    const codeExpires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        verificationCode: code,
        verificationCodeExpires: codeExpires,
      },
    });

    await sendVerificationEmail(email, code, 'login');

    return NextResponse.json({ success: true, message: 'Verification code sent' });
  } catch (error) {
    console.error('Send login code error:', error);
    return NextResponse.json({ error: 'Failed to send code' }, { status: 500 });
  }
}
