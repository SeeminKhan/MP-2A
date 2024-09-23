const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("./asyncHandler.js");

// Authentication Middleware
const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt; // Read JWT from cookies

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password"); // Exclude password from user object

    if (!req.user) {
      return res.status(401).json({ error: "Not authorized, invalid token." });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: "Not authorized, token verification failed." });
  }
});

// Authorization Middleware for Admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // Proceed if the user is an admin
  } else {
    return res.status(403).json({ error: "Forbidden: Not authorized as an admin." });
  }
};

module.exports = { authenticate, authorizeAdmin };
