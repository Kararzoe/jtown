const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify transporter on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

exports.sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Jos Marketplace!',
    html: `
      <h1>Welcome ${name}!</h1>
      <p>Thank you for joining Jos Marketplace.</p>
      <p>Start buying and selling today!</p>
      <a href="${process.env.FRONTEND_URL}">Visit Marketplace</a>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', email);
  } catch (error) {
    console.error('Email error:', error);
  }
};

exports.sendOrderNotification = async (email, name, productTitle) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'New Order Enquiry - Jos Marketplace',
    html: `
      <h2>New Order Enquiry</h2>
      <p>Hi ${name},</p>
      <p>You have a new enquiry for: <strong>${productTitle}</strong></p>
      <a href="${process.env.FRONTEND_URL}/dashboard">View Dashboard</a>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
  }
};

exports.sendMessageNotification = async (email, name, senderName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'New Message - Jos Marketplace',
    html: `
      <h2>New Message</h2>
      <p>Hi ${name},</p>
      <p>You have a new message from <strong>${senderName}</strong></p>
      <a href="${process.env.FRONTEND_URL}/chat">View Messages</a>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
  }
};

exports.sendPasswordReset = async (email, resetToken) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset - Jos Marketplace',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Reset Password</a>
      <p>This link expires in 1 hour.</p>
      <p>If you didn't request this, ignore this email.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
  }
};

exports.sendLoginCode = async (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Login Verification Code - Jos Marketplace',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #10b981; text-align: center;">Jos Marketplace</h2>
        <div style="background: #f9fafb; border-radius: 12px; padding: 30px; text-align: center;">
          <h3>Your Login Code</h3>
          <p style="color: #6b7280;">Use this code to sign in to your account:</p>
          <div style="background: #10b981; color: white; font-size: 32px; letter-spacing: 8px; padding: 15px 30px; border-radius: 8px; display: inline-block; font-weight: bold; margin: 20px 0;">
            ${code}
          </div>
          <p style="color: #9ca3af; font-size: 14px;">This code expires in 10 minutes.</p>
          <p style="color: #9ca3af; font-size: 12px;">If you didn't request this, ignore this email.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log('Login code sent to:', email);
};

exports.sendSignupCode = async (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email - Jos Marketplace',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #10b981; text-align: center;">Jos Marketplace</h2>
        <div style="background: #f9fafb; border-radius: 12px; padding: 30px; text-align: center;">
          <h3>Welcome! Verify your email</h3>
          <p style="color: #6b7280;">Use this code to complete your registration:</p>
          <div style="background: #10b981; color: white; font-size: 32px; letter-spacing: 8px; padding: 15px 30px; border-radius: 8px; display: inline-block; font-weight: bold; margin: 20px 0;">
            ${code}
          </div>
          <p style="color: #9ca3af; font-size: 14px;">This code expires in 10 minutes.</p>
          <p style="color: #9ca3af; font-size: 12px;">If you didn't request this, ignore this email.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log('Signup code sent to:', email);
};
