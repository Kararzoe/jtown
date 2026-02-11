const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
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
