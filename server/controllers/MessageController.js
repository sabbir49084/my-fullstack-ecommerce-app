const Message = require("../models/Message.js");

// @desc    Create a new message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const newMessage = await Message.create({
            name,
            email,
            subject,
            message,
            read: false, // new messages are unread by default
        });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (Admin)
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Update a message to read
// @route   PUT /api/messages/:id
// @access  Private (Admin)
const updateMessageToRead = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        message.read = true;
        await message.save();
        res.status(200).json(message);
    } catch (error) {
        console.error("Error updating message:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createMessage, getMessages, updateMessageToRead };