let client = null;

// Only initialize Twilio if credentials are provided
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
  const twilio = require('twilio');
  client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

exports.sendVerificationSMS = async (phone, code) => {
  if (!client) {
    console.log(`SMS (not configured): Verification code for ${phone}: ${code}`);
    return;
  }
  
  try {
    await client.messages.create({
      body: `Your Jos Marketplace verification code is: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    console.log('SMS sent to:', phone);
  } catch (error) {
    console.error('SMS error:', error);
  }
};

exports.sendOrderSMS = async (phone, productTitle) => {
  if (!client) {
    console.log(`SMS (not configured): Order notification for ${phone}`);
    return;
  }
  
  try {
    await client.messages.create({
      body: `New enquiry for your product: ${productTitle}. Check your dashboard.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
  } catch (error) {
    console.error('SMS error:', error);
  }
};
