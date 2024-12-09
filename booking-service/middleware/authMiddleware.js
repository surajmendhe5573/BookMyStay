const jwt = require('jsonwebtoken');
const User = require('../../user-service/models/user.model');
require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
