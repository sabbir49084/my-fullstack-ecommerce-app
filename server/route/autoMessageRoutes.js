const express = require("express");
const { updateAutoMessage, getAutoMessage } = require("../controllers/AutoMessageController.js");

const router = express.Router();

router.put("/", updateAutoMessage);
router.get("/", getAutoMessage);

module.exports = router;