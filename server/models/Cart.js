// models/Cart.js

const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [CartItemSchema],
}, {
  timestamps: true,
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart; // export default এর বদলে module.exports ব্যবহার করা হয়েছে