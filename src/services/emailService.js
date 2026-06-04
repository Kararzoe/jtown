const https = require('https');

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://josmkt.com.ng';

const sendEmail = (email, code, type) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ email, code, type });
    const url = new URL(FRONTEND_URL + '/api/auth/send-code');

    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(body || 'Email sending failed'));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(data);
    req.end();
  });
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
