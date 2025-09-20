// server/commentsmodal.js

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  reply: { // <-- নতুন ফিল্ড যোগ করা হয়েছে
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Comment', commentSchema);