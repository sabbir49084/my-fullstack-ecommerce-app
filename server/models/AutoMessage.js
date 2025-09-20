const mongoose = require("mongoose");

const autoMessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    enabled: {
        type: Boolean,
        default: false,
    },
});

const AutoMessage = mongoose.model("AutoMessage", autoMessageSchema);

module.exports = AutoMessage;