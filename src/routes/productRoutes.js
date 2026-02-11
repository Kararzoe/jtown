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
const { protect } = require('../middleware/auth');
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
router.post('/', protect, upload.array('images', 8), createProduct);
router.post('/draft', protect, saveDraft);
router.post('/bulk-delete', protect, bulkDelete);
router.post('/bulk-update', protect, bulkUpdate);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.post('/:id/favorite', protect, toggleFavorite);

module.exports = router;
