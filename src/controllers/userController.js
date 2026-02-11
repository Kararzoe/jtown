const User = require('../models/User');
const Product = require('../models/Product');
const { sendVerificationSMS } = require('../services/smsService');

// Follow/Unfollow seller
exports.toggleFollow = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const user = await User.findById(req.user._id);
    const seller = await User.findById(sellerId);

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    const isFollowing = user.following.includes(sellerId);

    if (isFollowing) {
      user.following = user.following.filter(id => id.toString() !== sellerId);
      seller.followers = seller.followers.filter(id => id.toString() !== req.user._id.toString());
    } else {
      user.following.push(sellerId);
      seller.followers.push(req.user._id);
    }

    await user.save();
    await seller.save();

    res.json({ following: !isFollowing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Block/Unblock user
exports.toggleBlock = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(req.user._id);

    const isBlocked = user.blockedUsers.includes(userId);

    if (isBlocked) {
      user.blockedUsers = user.blockedUsers.filter(id => id.toString() !== userId);
    } else {
      user.blockedUsers.push(userId);
    }

    await user.save();
    res.json({ blocked: !isBlocked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send verification code
exports.sendVerificationCode = async (req, res) => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await User.findById(req.user._id);

    user.verificationCode = code;
    user.verificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send SMS
    await sendVerificationSMS(user.phone, code);

    res.json({ message: 'Verification code sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify phone
exports.verifyPhone = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findById(req.user._id);

    if (!user.verificationCode || user.verificationExpires < Date.now()) {
      return res.status(400).json({ message: 'Code expired' });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: 'Invalid code' });
    }

    user.phoneVerified = true;
    user.verificationCode = undefined;
    user.verificationExpires = undefined;
    await user.save();

    res.json({ message: 'Phone verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('following');
    
    // Get products from followed sellers
    const followedSellerIds = user.following.map(f => f._id);
    const recommendations = await Product.find({
      seller: { $in: followedSellerIds },
      status: 'active'
    }).populate('seller', 'name shopName rating').limit(10);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get seller info
exports.getSellerInfo = async (req, res) => {
  try {
    const seller = await User.findById(req.params.sellerId).select('-password');
    const products = await Product.find({ seller: req.params.sellerId, status: 'active' });
    
    res.json({
      ...seller.toObject(),
      totalProducts: products.length,
      followerCount: seller.followers.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
