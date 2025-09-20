const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    // নতুন ফিল্ড যুক্ত করা হলো
    unit: { type: String, default: "unit" },
    weight: { type: Number, required: false },
    image: { type: String },
    images: [String],
    category: String,
    rating: { type: Number, default: 0 },
    additionalInfo: [{ key: String, value: String }]
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;