//server/route/category.js file

const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find();
        if (!categoryList) {
            return res.status(500).json({ success: false });
        }
        res.send(categoryList);
    } catch (err) {
        res.status(500).json({ error: err.message, success: false });
    }
});

// Get category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json(category);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Delete category
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({
                message: 'Category not found!',
                success: false
            });
        }
        return res.status(200).json({
            message: 'The category is deleted!',
            success: true
        });
    } catch (err) {
        return res.status(500).json({ error: err.message, success: false });
    }
});

// Create category (with Cloudinary image upload)
router.post('/create', async (req, res) => {
    try {
        const limit = pLimit(2);

        // Upload all images to Cloudinary
        const imagesToUpload = req.body.images.map((image) =>
            limit(async () => {
                const result = await cloudinary.uploader.upload(image, {
                    folder: "categories"
                });
                return result;
            })
        );

        const uploadStatus = await Promise.all(imagesToUpload);
        const imgurl = uploadStatus.map((item) => item.secure_url);

        if (!imgurl || imgurl.length === 0) {
            return res.status(500).json({
                error: "Images could not be uploaded",
                success: false
            });
        }

        // Save new category
        let category = new Category({
            name: req.body.name,
            images: imgurl,
            color: req.body.color
        });

        category = await category.save();

        return res.status(201).json(category);
    } catch (err) {
        return res.status(500).json({ error: err.message, success: false });
    }
});

// Update category
router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                images: req.body.images,
                color: req.body.color
            },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                message: 'The category cannot be updated!',
                success: false
            });
        }

        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json({ error: err.message, success: false });
    }
});

module.exports = router;