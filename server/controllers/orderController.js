const asyncHandler = require('express-async-handler');
const Order = require('../models/order');

// @desc    Create new order (for both COD & Online)
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    const { shippingInfo, orderItems, totalAmount, paymentMethod } = req.body;

    if (!shippingInfo || !orderItems || !totalAmount) {
        res.status(400);
        throw new Error('Missing required order data');
    }

    const order = await Order.create({
        user: req.user._id,
        shippingInfo,
        orderItems,
        totalAmount,
        paymentMethod,
        isPaid: paymentMethod !== 'COD',
        paidAt: paymentMethod !== 'COD' ? Date.now() : null,
    });

    res.status(201).json({ success: true, message: 'Order created successfully', order });
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/my-orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
});

// @desc    Cancel a user's order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        if (order.user.toString() !== req.user._id.toString() || order.status !== 'Pending') {
            res.status(401);
            throw new Error('You can only cancel your own pending orders');
        }

        order.status = 'Cancelled';
        await order.save();
        res.json({ success: true, message: 'Order has been cancelled' });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});


// @desc    Get all orders for admin
// @route   GET /api/orders/admin
// @access  Private/Admin
const getAdminOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'fullName email').sort({ createdAt: -1 });
    res.json({ success: true, orders });
});

// ✅ নতুন ফাংশন যোগ করা হলো: একটি নির্দিষ্ট অর্ডার ID দিয়ে অর্ডার খোঁজার জন্য
// @desc    Get a single order by ID for admin
// @route   GET /api/orders/admin/:id
// @access  Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
    // এখানে .populate('user', 'fullName email') ব্যবহার করা হয়েছে যাতে অর্ডারের সাথে ব্যবহারকারীর নাম ও ইমেলও পাওয়া যায়।
    const order = await Order.findById(req.params.id).populate('user', 'fullName email'); 

    if (order) {
        res.json({ success: true, order });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order status (by admin)
// @route   PUT /api/orders/admin/:id
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    order.status = status;
    await order.save();

    res.json({ success: true, message: 'Order status updated successfully', order });
});

module.exports = { 
    createOrder,
    getAdminOrders,
    updateOrderStatus,
    getUserOrders,
    cancelOrder,
    // ✅ নতুন ফাংশনটি export করা হলো
    getOrderById
};
