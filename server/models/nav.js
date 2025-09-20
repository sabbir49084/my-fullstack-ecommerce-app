const mongoose = require('mongoose');

const navSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        default: null,
    },
    logoPublicId: {
        type: String,
        default: null,
    },
    isLogo: {
        type: Boolean,
        default: false,
    },
});

exports.Nav = mongoose.model('Nav', navSchema);
