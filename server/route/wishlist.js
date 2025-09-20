// routes/wishlistRoutes.js

const express = require("express");
const Wishlist = require("../models/Wishlist");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
router.get("/", protect, async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "items.product"
    );
    if (wishlist) {
      res.json(wishlist);
    } else {
      res.json({ user: userId, items: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
router.post("/", protect, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }

    const itemExists = wishlist.items.find(
      (item) => item.product.toString() === productId
    );

    if (itemExists) {
      return res.status(409).json({ message: "Product already in wishlist" });
    } else {
      wishlist.items.push({ product: productId });
    }

    await wishlist.save();
    const populatedWishlist = await Wishlist.findById(wishlist._id).populate(
      "items.product"
    );

    res.status(201).json(populatedWishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
router.delete("/:productId", protect, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    const initialItemsCount = wishlist.items.length;
    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (wishlist.items.length === initialItemsCount) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    await wishlist.save();
    const populatedWishlist = await Wishlist.findById(wishlist._id).populate(
      "items.product"
    );
    res.status(200).json(populatedWishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;