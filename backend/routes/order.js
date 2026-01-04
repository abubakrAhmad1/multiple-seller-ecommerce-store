const express = require('express');
const router = express.Router();
const {
  createOrder,
  getBuyerOrders,
  getOrder,
  getSellerOrders,
  updateOrderStatus,
  updatePaymentStatus,
} = require('../controllers/orderControllers');
const auth = require('../middleware/auth');

// All routes are protected
router.post('/', auth, createOrder);
router.get('/', auth, getBuyerOrders);
router.get('/seller/my-orders', auth, getSellerOrders);
router.get('/:id', auth, getOrder);
router.put('/:id/status', auth, updateOrderStatus);
router.put('/:id/payment', auth, updatePaymentStatus);

module.exports = router;

