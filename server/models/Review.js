// models/Review.js

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // User ObjectId from the User model (if you have one)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // This refers to the User model
    },
    // The user's name
    userName: {
      type: String,
      required: true,
    },
    // The product ID this review belongs to
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product", // This refers to the Product model
    },
    // The star rating
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    // The review text
    reviewText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;