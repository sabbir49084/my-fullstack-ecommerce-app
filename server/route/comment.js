const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Ensure the path is correct

// =======================
// Create a new comment
// =======================
router.post('/', async (req, res) => {
  try {
    const { blogId, name, text } = req.body;
    if (!blogId || !name || !text) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newComment = new Comment({ blogId, name, text });
    await newComment.save();

    res.status(201).json({ success: true, message: 'Comment submitted for approval!' });
  } catch (err) {
    console.error("Error saving comment:", err);
    res.status(500).json({ success: false, message: 'Failed to submit comment.', error: err.message });
  }
});

// =======================
// Admin: Get new, unapproved comments
// =======================
router.get('/new', async (req, res) => {
  try {
    const newComments = await Comment.find({ isApproved: false })
      .populate('blogId', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json(newComments);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =======================
// Admin: Get all comments (approved + unapproved) for a blog
// =======================
router.get('/admin/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================
// Public: Get only approved comments for a blog
// =======================
router.get('/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId, isApproved: true }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================
// Approve a comment
// =======================
router.put('/approve/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================
// Delete a comment
// =======================
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================
// Reply to a comment
// =======================
router.put('/reply/:id', async (req, res) => {
  try {
    const { replyText } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { reply: replyText },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
