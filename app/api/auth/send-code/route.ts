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

    let subject = '';
    let html = '';

    if (type === 'login') {
      subject = 'Login Verification Code - Jos Marketplace';
      html = emailTemplate('Your Login Code', 'Use this code to sign in:', code);
    } else if (type === 'signup') {
      subject = 'Verify Your Email - Jos Marketplace';
      html = emailTemplate('Welcome! Verify your email', 'Use this code to complete your registration:', code);
    } else if (type === 'reset') {
      subject = 'Password Reset - Jos Marketplace';
      html = `
        <div style="font-family: Arial; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #10b981; text-align: center;">Jos Marketplace</h2>
          <p>Click below to reset your password:</p>
          <a href="https://josmkt.com.ng/reset-password?token=${code}" style="display:inline-block;padding:12px 24px;background:#10b981;color:white;border-radius:8px;text-decoration:none;">Reset Password</a>
          <p style="color:#9ca3af;font-size:12px;">Expires in 1 hour.</p>
        </div>`;
    } else {
      subject = 'Welcome to Jos Marketplace!';
      html = `
        <div style="font-family: Arial; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #10b981; text-align: center;">Welcome to Jos Marketplace!</h2>
          <p>Thank you for joining. Start buying and selling today!</p>
          <a href="https://josmkt.com.ng" style="display:inline-block;padding:12px 24px;background:#10b981;color:white;border-radius:8px;text-decoration:none;">Visit Marketplace</a>
        </div>`;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function emailTemplate(heading: string, desc: string, code: string) {
  return `
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
    </div>`;
}
