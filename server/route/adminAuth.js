// server/routes/adminAuth.js
const express = require("express");
const { check } = require("express-validator");
const { adminSignup, adminLogin } = require("../controllers/adminController");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({ min: 6 }),
    check("adminCode", "Admin code is required").notEmpty(),
  ],
  adminSignup
);

router.post("/login", adminLogin);

module.exports = router;
