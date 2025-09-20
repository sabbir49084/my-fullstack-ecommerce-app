const express = require('express');
const { 
  createOrder, 
  getAdminOrders, 
  updateOrderStatus, 
  getUserOrders, 
  cancelOrder,
  // ✅ getOrderById ফাংশনটি import করুন
  getOrderById
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Order related routes for authenticated users
router.route('/')
    .post(protect, createOrder);

router.route('/my-orders')
    .get(protect, getUserOrders);

router.route('/:id/cancel')
    .put(protect, cancelOrder);

// Admin routes for orders
router.route('/admin')
    .get(protect, admin, getAdminOrders);

router.route('/admin/:id')
    // ✅ এই লাইনটি যোগ করুন যাতে GET রিকোয়েস্টের মাধ্যমে একটি নির্দিষ্ট অর্ডার পাওয়া যায়
    .get(protect, admin, getOrderById)
    .put(protect, admin, updateOrderStatus);

module.exports = router;