import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { generateCode, sendVerificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email, password, name, phone } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, password, and name are required' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.verified) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const code = generateCode();
    const codeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (existing && !existing.verified) {
      // Update existing unverified user
      await prisma.user.update({
        where: { email },
        data: {
          password: hashPassword(password),
          name,
          phone: phone || null,
          verificationCode: code,
          verificationCodeExpires: codeExpires,
        },
      });
    } else {
      // Create new user
      await prisma.user.create({
        data: {
          email,
          password: hashPassword(password),
          name,
          phone: phone || null,
          verificationCode: code,
          verificationCodeExpires: codeExpires,
        },
      });
    }

    await sendVerificationEmail(email, code, 'register');

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to your email',
      requiresVerification: true,
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
