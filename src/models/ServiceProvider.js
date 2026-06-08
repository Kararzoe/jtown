const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  serviceName: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String },
  priceRange: { type: String },
  image: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
