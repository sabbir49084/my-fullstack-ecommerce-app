// server/routes/user.js
const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getUsers,
  updateRole,
  updateStatus,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.use(protect, admin);

router.get("/", getUsers);
router.patch("/:id/role", updateRole);
router.patch("/:id/status", updateStatus);
router.delete("/:id", deleteUser);

module.exports = router;
