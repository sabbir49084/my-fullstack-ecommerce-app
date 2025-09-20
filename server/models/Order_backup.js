// server/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    shippingInfo: {
        fullName: { type: String, required: true },
        country: { type: String, required: true },
        streetAddress1: { type: String, required: true }, // ✅ Updated to match frontend
        streetAddress2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        phoneNumber: { type: String, required: true }, // ✅ Updated to match frontend
        email: { type: String, required: true },
    },
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Stripe', 'PayPal', 'Crypto'],
        required: true,
        default: 'COD',
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;