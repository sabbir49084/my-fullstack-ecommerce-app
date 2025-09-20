const AutoMessage = require("../models/AutoMessage.js");

// @desc    Update or create the auto message
// @route   PUT /api/automessage
// @access  Private (Admin)
const updateAutoMessage = async (req, res) => {
    try {
        const { message, enabled } = req.body;

        // Find the existing auto message or create a new one
        let autoMessage = await AutoMessage.findOne();

        if (!autoMessage) {
            autoMessage = new AutoMessage({ message, enabled });
        } else {
            autoMessage.message = message;
            autoMessage.enabled = enabled;
        }

        await autoMessage.save();
        res.status(200).json(autoMessage);
    } catch (error) {
        console.error("Error updating auto message:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get the current auto message
// @route   GET /api/automessage
// @access  Public
const getAutoMessage = async (req, res) => {
    try {
        const autoMessage = await AutoMessage.findOne();
        if (!autoMessage || !autoMessage.enabled) {
            return res.status(404).json({ message: "No active auto message found." });
        }
        res.status(200).json(autoMessage);
    } catch (error) {
        console.error("Error fetching auto message:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { updateAutoMessage, getAutoMessage };