import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendVerificationEmail(email: string, code: string, type: 'login' | 'signup') {
  const subject = type === 'signup'
    ? 'Verify Your Email - Jos Marketplace'
    : 'Login Verification Code - Jos Marketplace';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #10b981; text-align: center;">Jos Marketplace</h2>
      <div style="background: #f9fafb; border-radius: 12px; padding: 30px; text-align: center;">
        <h3>${type === 'signup' ? 'Welcome! Verify your email' : 'Your login code'}</h3>
        <p style="color: #6b7280;">Use the code below to ${type === 'signup' ? 'complete your registration' : 'sign in to your account'}:</p>
        <div style="background: #10b981; color: white; font-size: 32px; letter-spacing: 8px; padding: 15px 30px; border-radius: 8px; display: inline-block; font-weight: bold; margin: 20px 0;">
          ${code}
        </div>
        <p style="color: #9ca3af; font-size: 14px;">This code expires in 10 minutes.</p>
        <p style="color: #9ca3af; font-size: 12px;">If you didn't request this, ignore this email.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html,
  });
}
