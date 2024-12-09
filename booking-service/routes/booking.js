const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/booking.controller');
const { verifyToken } = require('../middleware/authMiddleware'); 

// Create a booking
router.post('/', verifyToken, createBooking);

// Get all bookings for the user
router.get('/', verifyToken, getUserBookings);

module.exports = router;
