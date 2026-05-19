import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { email, code, type } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code required' }, { status: 400 });
    }

    const subject = type === 'signup'
      ? 'Verify Your Email - Jos Marketplace'
      : 'Login Verification Code - Jos Marketplace';

    const heading = type === 'signup'
      ? 'Welcome! Verify your email'
      : 'Your Login Code';

    const desc = type === 'signup'
      ? 'Use this code to complete your registration:'
      : 'Use this code to sign in to your account:';

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #10b981; text-align: center;">Jos Marketplace</h2>
          <div style="background: #f9fafb; border-radius: 12px; padding: 30px; text-align: center;">
            <h3>${heading}</h3>
            <p style="color: #6b7280;">${desc}</p>
            <div style="background: #10b981; color: white; font-size: 32px; letter-spacing: 8px; padding: 15px 30px; border-radius: 8px; display: inline-block; font-weight: bold; margin: 20px 0;">
              ${code}
            </div>
            <p style="color: #9ca3af; font-size: 14px;">This code expires in 10 minutes.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email: ' + error.message }, { status: 500 });
  }
}
