const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const {
  getStats,
  getAllUsers,
  deleteUser,
  getAllProducts,
  deleteProduct,
  getAllReports,
  updateReportStatus
} = require('../controllers/adminController');

const router = express.Router();

router.use(protect, restrictTo('admin'));

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/products', getAllProducts);
router.delete('/products/:id', deleteProduct);
router.get('/reports', getAllReports);
router.patch('/reports/:id', updateReportStatus);

module.exports = router;
