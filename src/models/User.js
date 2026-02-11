const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' },
  avatar: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  location: { type: String, default: '' },
  shopName: { type: String },
  shopDescription: { type: String },
  shopLogo: { type: String },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  verificationCode: { type: String },
  verificationExpires: { type: Date },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  idDocument: { type: String },
  businessRegistration: { type: String },
  savedSearches: [{
    name: String,
    filters: mongoose.Schema.Types.Mixed,
    notifyOnNew: { type: Boolean, default: true }
  }],
  recentlyViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  compareList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  subscription: { type: String, enum: ['free', 'premium', 'business'], default: 'free' },
  subscriptionExpires: { type: Date },
  loyaltyPoints: { type: Number, default: 0 },
  coupons: [{
    code: String,
    discount: Number,
    type: { type: String, enum: ['percentage', 'fixed'] },
    minPurchase: Number,
    expiresAt: Date,
    usedCount: { type: Number, default: 0 },
    maxUses: Number
  }],
  shops: [{
    name: String,
    description: String,
    logo: String,
    isActive: { type: Boolean, default: true }
  }],
  notifications: [{
    type: String,
    message: String,
    link: String,
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
