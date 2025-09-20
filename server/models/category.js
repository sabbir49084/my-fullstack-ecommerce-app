//server/model/category.js file

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    images: [
        {
            type: String,
            required: true,
        }
    ],
    color: {
        type: String,
        required: true,
        trim: true,
    },
});

// Virtual field for id
categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Enable virtuals in JSON output
categorySchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Category', categorySchema);
