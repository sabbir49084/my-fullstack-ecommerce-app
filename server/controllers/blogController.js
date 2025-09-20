// server/controllers/blogController.js

const { Blog } = require('../models/blog');

// Fetch all blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch blogs." });
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch blog." });
    }
};

// Create a new blog
exports.createBlog = async (req, res) => {
    try {
        let blog = new Blog({
            id: Date.now(), // Use current timestamp as a unique ID for new blogs
            title: req.body.title,
            excerpt: req.body.excerpt,
            content: req.body.content,
            author: req.body.author,
            date: req.body.date,
            image: req.body.image,
            category: req.body.category,
            tags: req.body.tags
        });

        blog = await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create blog." });
    }
};

// Update an existing blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                excerpt: req.body.excerpt,
                content: req.body.content,
                author: req.body.author,
                date: req.body.date,
                image: req.body.image,
                category: req.body.category,
                tags: req.body.tags
            },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Failed to update blog." });
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }
        res.status(200).json({ success: true, message: 'Blog deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete blog." });
    }
};