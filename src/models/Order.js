const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  status: { type: String, enum: ['enquiry', 'negotiating', 'completed', 'cancelled'], default: 'enquiry' },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
