// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token = null;

  // Token sources: Bearer header OR Cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded payload এ আমরা token বানানোর সময় userId/id দিয়েছি
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // ✅ এখন req.user এ পুরো user object থাকবে
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Token invalid or expired" });
  }
};

const admin = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized" });
  }
  if (req.user.role !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "Admin resource. Access denied.",
    });
  }
  next();
};

// 👉 চাইলে পরে manager/other roles এর জন্যও একই রকম middleware বানাতে পারবেন
const manager = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized" });
  }
  if (req.user.role !== "Manager") {
    return res.status(403).json({
      success: false,
      message: "Manager resource. Access denied.",
    });
  }
  next();
};

module.exports = { protect, admin, manager };
