const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  condition: { type: String, enum: ['new', 'used', 'refurbished'], default: 'new' },
  images: [{ type: String }],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  coordinates: { lat: Number, lng: Number },
  stock: { type: Number, default: 1 },
  views: { type: Number, default: 0 },
  viewsHistory: [{ date: Date, count: Number }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['active', 'sold', 'inactive', 'draft', 'expired'], default: 'active' },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  featuredUntil: { type: Date },
  promoted: { type: Boolean, default: false },
  promotedUntil: { type: Date },
  promotionPlan: { type: String, enum: ['basic', 'premium', 'featured'], default: 'basic' },
  flashSale: {
    active: { type: Boolean, default: false },
    originalPrice: Number,
    discountPercent: Number,
    startDate: Date,
    endDate: Date
  },
  lowStockAlert: { type: Number, default: 5 },
  expiresAt: { type: Date },
  isDraft: { type: Boolean, default: false }
}, { timestamps: true });

productSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
