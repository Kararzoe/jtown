const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const {
  applyAsProvider,
  applyPublic,
  getProvidersByCategory,
  getProviderById,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/serviceController');

const router = express.Router();

// Specific routes FIRST
router.get('/all', protect, restrictTo('admin'), getAllApplications);
router.get('/my-applications', protect, getMyApplications);
router.get('/category/:category', getProvidersByCategory);
router.post('/apply', protect, restrictTo('admin'), applyAsProvider);
router.post('/apply-public', applyPublic);

// Dynamic :id routes LAST
router.get('/:id', getProviderById);
router.patch('/:id/status', protect, restrictTo('admin'), updateApplicationStatus);
router.delete('/:id', protect, restrictTo('admin'), deleteApplication);

module.exports = router;
