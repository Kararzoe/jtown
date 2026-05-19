import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth';
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

    const code = generateCode();
    const codeExpires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { verificationCode: code, verificationCodeExpires: codeExpires },
    });

    try {
      await sendVerificationEmail(email, code, 'login');
      return NextResponse.json({ success: true, message: 'Verification code sent' });
    } catch (emailError) {
      console.error('Email send failed:', emailError);
      // Auto-login if email can't be sent
      const token = generateToken(user.id);
      return NextResponse.json({
        success: true,
        token,
        autoLogin: true,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
    }
  } catch (error) {
    console.error('Send login code error:', error);
    return NextResponse.json({ error: 'Failed to send code' }, { status: 500 });
  }
}
