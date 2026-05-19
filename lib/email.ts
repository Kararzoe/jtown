import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendVerificationEmail(email: string, code: string, type: 'login' | 'register') {
  const subject = type === 'login' ? 'Your JosMKT Login Code' : 'Verify Your JosMKT Account';

  await resend.emails.send({
    from: 'JosMKT <onboarding@resend.dev>',
    to: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #059669; margin: 0; font-size: 24px;">JosMKT</h1>
          <p style="color: #6b7280; margin-top: 4px;">Your #1 Marketplace in Jos</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 8px; text-align: center;">
          <p style="color: #374151; font-size: 16px; margin-bottom: 16px;">
            ${type === 'login' ? 'Your login verification code is:' : 'Your verification code is:'}
          </p>
          <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #059669;">${code}</span>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This code expires in 10 minutes.</p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 16px;">If you didn't request this, please ignore this email.</p>
        </div>
      </div>
    `
  });
}
