const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "defaultsecret",
    { expiresIn: "7d" }
  );
}

module.exports = { generateToken };
