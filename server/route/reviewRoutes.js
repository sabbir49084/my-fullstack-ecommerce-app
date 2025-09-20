// routes/reviewRoutes.js

const express = require("express");
const Review = require("../models/Review");
const Product = require("../models/product"); // Assuming your Product model is here
const { protect } = require("../middleware/authMiddleware"); // Assuming you have authentication middleware

const router = express.Router();

// @desc    Get all reviews for a specific product
// @route   GET /api/reviews/product/:productId
// @access  Public
router.get("/product/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Submit a new review
// @route   POST /api/reviews
// @access  Private (User must be logged in)
router.post("/", protect, async (req, res) => {
  const { productId, rating, reviewText } = req.body;
  const user = req.user._id; // Get user ID from the authenticated user object
  const userName = req.user.name; // Get user's name from the authenticated user object

  if (!productId || !rating || !reviewText) {
    return res.status(400).json({ message: "Please provide product ID, rating, and review text." });
  }

  try {
    const existingReview = await Review.findOne({ user, product: productId });
    if (existingReview) {
      return res.status(409).json({ message: "You have already reviewed this product." });
    }

    const review = new Review({
      user,
      userName,
      product: productId,
      rating,
      reviewText,
    });

    await review.save();

    // After saving the review, update the product's average rating and total review count
    const product = await Product.findById(productId);
    if (product) {
      const allProductReviews = await Review.find({ product: productId });
      const totalRating = allProductReviews.reduce((acc, item) => item.rating + acc, 0);
      const averageRating = totalRating / allProductReviews.length;

      product.rating = averageRating.toFixed(1);
      product.numReviews = allProductReviews.length;
      await product.save();
    }

    res.status(201).json({ message: "Review submitted successfully!", review });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;