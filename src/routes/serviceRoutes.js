const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const {
  applyAsProvider,
  getProvidersByCategory,
  getProviderById,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/serviceController');

const router = express.Router();

router.get('/category/:category', getProvidersByCategory);
router.get('/:id', getProviderById);
router.post('/apply', protect, restrictTo('admin'), applyAsProvider);
router.get('/my-applications', protect, getMyApplications);
router.get('/all', protect, restrictTo('admin'), getAllApplications);
router.patch('/:id/status', protect, restrictTo('admin'), updateApplicationStatus);
router.delete('/:id', protect, restrictTo('admin'), deleteApplication);

module.exports = router;
