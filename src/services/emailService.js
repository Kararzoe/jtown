const FRONTEND_URL = process.env.FRONTEND_URL || 'https://josmkt.com.ng';
const EMAIL_API = FRONTEND_URL + '/api/auth/send-code';

const sendEmail = async (email, code, type) => {
  const res = await fetch(EMAIL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code, type })
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Email sending failed');
  }
};

exports.sendLoginCode = async (email, code) => {
  await sendEmail(email, code, 'login');
  console.log('Login code sent to:', email);
};

exports.sendSignupCode = async (email, code) => {
  await sendEmail(email, code, 'signup');
  console.log('Signup code sent to:', email);
};

exports.sendWelcomeEmail = async (email, name) => {
  try {
    await sendEmail(email, 'welcome', 'welcome');
  } catch (error) {
    console.error('Welcome email error:', error.message);
  }
};

exports.sendPasswordReset = async (email, resetToken) => {
  try {
    await sendEmail(email, resetToken, 'reset');
  } catch (error) {
    console.error('Password reset email error:', error.message);
  }
};

exports.sendOrderNotification = async (email, name, productTitle) => {
  console.log('Order notification for:', email, productTitle);
};

exports.sendMessageNotification = async (email, name, senderName) => {
  console.log('Message notification for:', email, 'from', senderName);
};
