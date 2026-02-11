const express = require('express');
const { createOrder, getMyOrders, getSellerOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/seller-orders', protect, getSellerOrders);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
