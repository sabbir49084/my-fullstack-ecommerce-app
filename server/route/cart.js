// routes/cartRoutes.js

const express = require("express");
const Cart = require("../models/Cart.js"); // Make sure this path is correct
const { protect } = require("../middleware/authMiddleware"); // Make sure this path is correct
const router = express.Router();

// @desc    Add or update item in cart
// @route   POST /api/cart
// @access  Private
router.post("/", protect, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemExists = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (itemExists) {
      itemExists.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.product"
    );

    res.status(200).json(populatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update an item's quantity in the cart
// @desc    Update item quantity in cart
// @route   PUT /api/cart
// @access  Private
router.put("/", protect, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemToUpdate = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!itemToUpdate) {
      return res.status(404).json({ message: "Product not in cart" });
    }
    
    // Ensure quantity is a number and is greater than 0
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    itemToUpdate.quantity = quantity;

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.product"
    );
    res.status(200).json(populatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Remove an item from the cart
// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
router.delete("/:productId", protect, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const initialItemsCount = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === initialItemsCount) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.product"
    );
    res.status(200).json(populatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
router.get("/", protect, async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );
    if (cart) {
      res.json(cart);
    } else {
      res.json({ user: userId, items: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;