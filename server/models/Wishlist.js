// models/Wishlist.js

const mongoose = require("mongoose");

const WishlistSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true, // প্রতি ইউজারের জন্য শুধুমাত্র একটি উইশলিস্ট থাকবে
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;