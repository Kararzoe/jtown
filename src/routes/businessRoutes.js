const express = require('express');
const { protect } = require('../middleware/auth');
const {
  promoteProduct,
  createFlashSale,
  getFlashSales,
  createCoupon,
  applyCoupon,
  addLoyaltyPoints,
  redeemPoints,
  getSellerAnalytics,
  updateStock,
  createShop,
  getShops
} = require('../controllers/businessController');

const router = express.Router();

router.post('/promote', protect, promoteProduct);
router.post('/flash-sale', protect, createFlashSale);
router.get('/flash-sales', getFlashSales);
router.post('/coupon', protect, createCoupon);
router.post('/apply-coupon', protect, applyCoupon);
router.post('/loyalty/add', protect, addLoyaltyPoints);
router.post('/loyalty/redeem', protect, redeemPoints);
router.get('/analytics', protect, getSellerAnalytics);
router.post('/stock', protect, updateStock);
router.post('/shop', protect, createShop);
router.get('/shops', protect, getShops);

module.exports = router;
