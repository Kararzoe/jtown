const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  toggleFavorite,
  getMyProducts,
  getFavorites,
  getProductAnalytics,
  getTrending,
  getRelated,
  saveDraft,
  getDrafts,
  bulkDelete,
  bulkUpdate,
  searchNearby
} = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getProducts);
router.get('/trending', getTrending);
router.get('/nearby', searchNearby);
router.get('/my-products', protect, getMyProducts);
router.get('/favorites', protect, getFavorites);
router.get('/drafts', protect, getDrafts);
router.get('/:id', getProduct);
router.get('/:id/analytics', protect, getProductAnalytics);
router.get('/:id/related', getRelated);
router.post('/', protect, restrictTo('admin'), upload.array('images', 8), createProduct);
router.post('/draft', protect, restrictTo('admin'), saveDraft);
router.post('/bulk-delete', protect, restrictTo('admin'), bulkDelete);
router.post('/bulk-update', protect, restrictTo('admin'), bulkUpdate);
router.put('/:id', protect, restrictTo('admin'), updateProduct);
router.delete('/:id', protect, restrictTo('admin'), deleteProduct);
router.post('/:id/favorite', protect, toggleFavorite);

module.exports = router;
