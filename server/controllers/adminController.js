const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/Token");

exports.adminSignup = async (req, res) => {
  // তোমার signup logic এখানে
};

exports.adminLogin = async (req, res) => {
  try {
    console.log("✅ adminLogin hit");
    console.log("👉 Request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const admin = await User.findOne({ email, role: "Admin" });
    console.log("👉 DB lookup result:", admin);

    if (!admin) {
      console.log("❌ No admin found with given email and role");
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("👉 Password match?", isMatch);

    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(admin);
    console.log("✅ Admin login successful, token generated");

    return res.json({ success: true, user: admin, token });
  } catch (err) {
    console.error("🔥 loginAdmin error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
