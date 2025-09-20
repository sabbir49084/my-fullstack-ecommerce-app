const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/Token");

// ------------------ Client Signup ------------------
exports.signupUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email, role: "Customer" });
    if (user) {
      return res.status(400).json({ success: false, message: "Email already registered as Customer" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashed, role: "Customer" });
    await user.save();

    const token = generateToken(user);
    return res.status(201).json({ success: true, user, token });
  } catch (err) {
    console.error("🔥 signupUser error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------ Admin Signup ------------------
exports.signupAdmin = async (req, res) => {
  const { name, email, password, adminCode } = req.body;

  if (adminCode !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ success: false, message: "Invalid admin secret code" });
  }

  try {
    let admin = await User.findOne({ email, role: "Admin" });
    if (admin) {
      return res.status(400).json({ success: false, message: "Email already registered as Admin" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    admin = new User({ name, email, password: hashed, role: "Admin" });
    await admin.save();

    const token = generateToken(admin);
    return res.status(201).json({ success: true, user: admin, token });
  } catch (err) {
    console.error("🔥 signupAdmin error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------ Client Login ------------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("👉 Client login attempt:", email);

    const user = await User.findOne({ email, role: "Customer" });
    console.log("👉 DB User (Customer):", user);

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("👉 Password match?", isMatch);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);
    return res.json({ success: true, user, token });
  } catch (err) {
    console.error("🔥 loginUser error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------ Admin Login ------------------
// ------------------ Admin Login ------------------
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Step 0: request body log
  console.log("👉 Admin login attempt:", email);
  console.log("👉 Request body received:", req.body);

  try {
    // Step 1: Check if email/password exists
    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Step 2: Find admin in DB
    const admin = await User.findOne({ email, role: "Admin" });
    console.log("👉 DB lookup result (Admin):", admin);

    if (!admin) {
      console.log("❌ No admin found with given email and role");
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Step 3: Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("👉 Password match?", isMatch);

    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Step 4: Generate token
    const token = generateToken(admin);
    console.log("✅ Admin login successful, token generated");

    return res.json({ success: true, user: admin, token });

  } catch (err) {
    // Step 5: Catch errors and log full error object
    console.error("🔥 loginAdmin error caught:", err);
    console.log("❗ Error stack:", err.stack); // stack trace দেখাবে

    // response হিসেবে server error পাঠাও
    return res.status(500).json({ success: false, message: "Server error occurred" });
  }
};
