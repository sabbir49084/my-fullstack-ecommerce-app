// server/models/blog.js

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    }
});

// Virtual field এর নাম conflict-free করা হলো
blogSchema.virtual('blogId').get(function () {
    return this._id.toHexString();
});

blogSchema.set('toJSON', {
    virtuals: true,
});

exports.Blog = mongoose.model('Blog', blogSchema);
