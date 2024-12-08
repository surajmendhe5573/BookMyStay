const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token data to req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
};

module.exports = { authenticate };
