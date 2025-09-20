const express = require("express");
const { body } = require("express-validator");
const {
  signupUser,
  signupAdmin,
  loginUser,
  loginAdmin,
} = require("../controllers/authController");

const router = express.Router();

/**
 * =========================
 *  Customer Routes
 * =========================
 */

// @route   POST /auth/signup
// @desc    Customer Signup
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  signupUser
);

// @route   POST /auth/login
// @desc    Customer Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);

/**
 * =========================
 *  Admin Routes
 * =========================
 */

// @route   POST /auth/admin/signup
// @desc    Admin Signup (requires ADMIN_SECRET)
router.post(
  "/admin/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("adminCode").notEmpty().withMessage("Admin code is required"),
  ],
  signupAdmin
);

// @route   POST /auth/admin/login
// @desc    Admin Login
router.post(
  "/admin/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginAdmin
);

module.exports = router;
