const express = require("express");
const { createMessage, getMessages, updateMessageToRead } = require("../controllers/MessageController.js");

const router = express.Router();

// Public route to create a new message
router.post("/", createMessage);

// Private routes for admin panel
router.get("/", getMessages); // to get all messages for admin panel
router.put("/:id", updateMessageToRead); // to mark a message as read

module.exports = router;