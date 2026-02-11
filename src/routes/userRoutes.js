const express = require('express');
const {
  toggleFollow,
  toggleBlock,
  sendVerificationCode,
  verifyPhone,
  getRecommendations,
  getSellerInfo
} = require('../controllers/userController');
const {
  saveSearch,
  getSavedSearches,
  deleteSavedSearch,
  getNotifications,
  markNotificationRead,
  addToCompare,
  removeFromCompare,
  getCompareList,
  getRecentlyViewed,
  uploadVerification,
  upgradeSubscription
} = require('../controllers/userFeaturesController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/follow/:sellerId', protect, toggleFollow);
router.post('/block/:userId', protect, toggleBlock);
router.post('/send-verification', protect, sendVerificationCode);
router.post('/verify-phone', protect, verifyPhone);
router.get('/recommendations', protect, getRecommendations);
router.get('/seller/:sellerId', getSellerInfo);

router.post('/saved-searches', protect, saveSearch);
router.get('/saved-searches', protect, getSavedSearches);
router.delete('/saved-searches/:id', protect, deleteSavedSearch);
router.get('/notifications', protect, getNotifications);
router.patch('/notifications/:id/read', protect, markNotificationRead);
router.post('/compare/:productId', protect, addToCompare);
router.delete('/compare/:productId', protect, removeFromCompare);
router.get('/compare', protect, getCompareList);
router.get('/recently-viewed', protect, getRecentlyViewed);
router.post('/verification', protect, uploadVerification);
router.post('/subscription', protect, upgradeSubscription);

module.exports = router;
