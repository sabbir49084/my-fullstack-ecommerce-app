const Product = require("../models/product");
const cloudinary = require("cloudinary").v2;
const fs = require('fs');

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Create Product
exports.createProduct = async (req, res) => {
    try {
        const { 
            title, category, price, stock, description, seoTitle, seoDescription, tags, rating, additionalInfo,
            unit, // নতুন ফিল্ড
            weight, // নতুন ফিল্ড
        } = req.body;

        let uploadedImageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "products",
                });
                uploadedImageUrls.push(result.secure_url);
                fs.unlinkSync(file.path);
            }
        }

        const product = new Product({
            title,
            category,
            price,
            stock,
            description,
            seoTitle,
            seoDescription,
            tags,
            rating,
            unit, // নতুন ফিল্ড
            weight, // নতুন ফিল্ড
            image: uploadedImageUrls[0] || '',
            images: uploadedImageUrls,
            additionalInfo: additionalInfo ? JSON.parse(additionalInfo) : [],
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
};

// ✅ Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

// ✅ Get Single Product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch product", error: error.message });
    }
};

// ✅ Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { 
            title, category, price, stock, description, seoTitle, seoDescription, tags, rating, additionalInfo,
            unit, // নতুন ফিল্ড
            weight, // নতুন ফিল্ড
        } = req.body;

        let updatedData = { 
            title, category, price, stock, description, seoTitle, seoDescription, tags, rating, 
            unit, // নতুন ফিল্ড
            weight, // নতুন ফিল্ড
            additionalInfo: additionalInfo ? JSON.parse(additionalInfo) : []
        };
        
        if (req.files && req.files.length > 0) {
            let uploadedImageUrls = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "products",
                });
                uploadedImageUrls.push(result.secure_url);
                fs.unlinkSync(file.path);
            }
            updatedData.image = uploadedImageUrls[0];
            updatedData.images = uploadedImageUrls;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
};

// ✅ Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};