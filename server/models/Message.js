// server/models/Message.js

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // এটি createdAt এবং updatedAt ফিল্ড যোগ করবে
    }
);

const Message = mongoose.model("Message", messageSchema);

// ✅ CommonJS ফরম্যাটে এক্সপোর্ট করা হয়েছে
module.exports = Message;