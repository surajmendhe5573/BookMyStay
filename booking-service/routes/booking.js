const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getBookingById, cancelBooking } = require('../controllers/booking.controller');
const { verifyToken } = require('../middleware/authMiddleware'); 


router.post('/', verifyToken, createBooking);  // Create a booking
router.get('/', verifyToken, getUserBookings); // Get all bookings for the user
router.get('/:id',verifyToken, getBookingById);  // Get a specific booking by ID
router.put('/:id/cancel',verifyToken, cancelBooking);  // Cancel booking route

module.exports = router;
