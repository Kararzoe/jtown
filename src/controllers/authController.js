const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendWelcomeEmail, sendSignupCode, sendLoginCode: sendLoginCodeEmail } = require('../services/emailService');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const userExists = await User.findOne({ email, verified: true });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Update existing unverified user or create new
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      existingUser.name = name;
      existingUser.phone = phone;
      existingUser.password = password;
      existingUser.verified = false;
      existingUser.verificationCode = code;
      existingUser.verificationCodeExpires = Date.now() + 600000;
      await existingUser.save();
    } else {
      await User.create({
        name, email, phone, password, role,
        verificationCode: code,
        verificationCodeExpires: Date.now() + 600000
      });
    }

    await sendSignupCode(email, code);

    res.status(201).json({
      success: true,
      requiresVerification: true,
      message: 'Verification code sent to your email'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifySignup = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({
      email,
      verificationCode: code,
      verificationCodeExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    user.verified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    const token = generateToken(user._id);
    sendWelcomeEmail(email, user.name);

    res.json({
      success: true,
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      shopName: user.shopName,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = Math.random().toString(36).substring(2, 15);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const { sendPasswordReset } = require('../services/emailService');
    await sendPasswordReset(email, resetToken);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendLoginCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' });
    }

    // Auto-verify old accounts that existed before verification system
    if (!user.verified) {
      user.verified = true;
      await user.save();
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.loginCode = code;
    user.loginCodeExpires = Date.now() + 600000;
    await user.save();

    await sendLoginCodeEmail(email, code);

    res.json({ success: true, message: 'Verification code sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyLoginCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({
      email,
      loginCode: code,
      loginCodeExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    user.loginCode = undefined;
    user.loginCodeExpires = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      shopName: user.shopName,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
