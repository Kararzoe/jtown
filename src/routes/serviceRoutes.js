const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const {
  applyAsProvider,
  getProvidersByCategory,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/serviceController');

const router = express.Router();

router.get('/category/:category', getProvidersByCategory);
router.post('/apply', protect, applyAsProvider);
router.get('/my-applications', protect, getMyApplications);
router.get('/all', protect, restrictTo('admin'), getAllApplications);
router.patch('/:id/status', protect, restrictTo('admin'), updateApplicationStatus);
router.delete('/:id', protect, restrictTo('admin'), deleteApplication);

module.exports = router;
