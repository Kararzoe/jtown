import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';
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
    const codeExpires = new Date(Date.now() + 10 * 60 * 1000);

    let user;
    if (existing && !existing.verified) {
      user = await prisma.user.update({
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
      user = await prisma.user.create({
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

    // Try to send email, but don't fail registration if email fails
    try {
      await sendVerificationEmail(email, code, 'register');
      return NextResponse.json({
        success: true,
        message: 'Verification code sent to your email',
        requiresVerification: true,
      });
    } catch (emailError) {
      console.error('Email send failed:', emailError);
      // Auto-verify and login if email can't be sent
      const verifiedUser = await prisma.user.update({
        where: { id: user.id },
        data: { verified: true, verificationCode: null, verificationCodeExpires: null },
      });
      const token = generateToken(verifiedUser.id);
      return NextResponse.json({
        success: true,
        token,
        user: { id: verifiedUser.id, email: verifiedUser.email, name: verifiedUser.name, role: verifiedUser.role },
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
