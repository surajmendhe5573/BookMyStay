const Booking = require('../models/booking.model');
const Hotel = require('../../hotel-service/models/hotel.model');
const User = require('../../user-service/models/user.model');
const axios= require('axios');

exports.createBooking = async (req, res) => {
    try {
      const { hotelId, room, checkInDate, checkOutDate } = req.body;
      const userId = req.user.id; // Assuming JWT authentication
  
      // Call the hotel-service to get hotel and room details
      const hotelServiceUrl = `http://localhost:5001/api/hotels/${hotelId}`;
      const response = await axios.get(hotelServiceUrl);
  
      if (response.status !== 200) {
        return res.status(response.status).json({ message: response.data.message });
      }
  
      const hotel = response.data;
      const roomAvailable = hotel.rooms.find(r => r.roomType === room && r.isAvailable);
      if (!roomAvailable) {
        return res.status(400).json({ message: 'Room is not available' });
      }
  
      // Calculate total price based on date difference
      const checkInTime = new Date(checkInDate).getTime();
      const checkOutTime = new Date(checkOutDate).getTime();
      const millisecondsPerDay = 1000 * 3600 * 24;
      const dayDifference = (checkOutTime - checkInTime) / millisecondsPerDay;
  
      if (isNaN(dayDifference) || dayDifference <= 0) {
        return res.status(400).json({ message: 'Invalid check-in/check-out dates' });
      }
  
      const totalPrice = roomAvailable.price * dayDifference;
  
      // Create the booking
      const booking = new Booking({
        user: userId,
        hotel: hotelId,
        room,
        checkInDate,
        checkOutDate,
        totalPrice,
      });
  
      await booking.save();
      return res.status(201).json({
        message: 'Booking created successfully',
        data: booking,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
  
// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
    try {
      const userId = req.user.id; 
      const bookings = await Booking.find({ user: userId });
  
      // Manually populate hotel data
      const populatedBookings = await Promise.all(
        bookings.map(async (booking) => {
          const hotelDetails = await axios.get(`http://localhost:5001/api/hotels/${booking.hotel}`);
          return { ...booking.toObject(), hotel: hotelDetails.data };
        })
      );
  
      return res.status(200).json({
        message: 'Bookings retrieved successfully',
        data: populatedBookings,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  };

  // Get a specific booking by ID
exports.getBookingById = async (req, res) => {
    try {
      const { id } = req.params; 
      const userId = req.user.id; 
  
      // Find the booking by its ID and ensure the booking belongs to the authenticated user
      const booking = await Booking.findOne({ _id: id, user: userId });
    
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
    
      // Manually populate hotel data
      const hotelDetails = await axios.get(`http://localhost:5001/api/hotels/${booking.hotel}`);
    
      return res.status(200).json({
        message: 'Booking details retrieved successfully',
        data: { ...booking.toObject(), hotel: hotelDetails.data },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  };
  
// Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
      const { id } = req.params; 
      const userId = req.user.id; // Get the authenticated user ID
    
      const booking = await Booking.findOne({ _id: id, user: userId });
      
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      
      // Check if the booking is already cancelled
      if (booking.status === 'cancelled') {
        return res.status(400).json({ message: 'Booking is already cancelled' });
      }
  
      // Update the booking status to 'cancelled'
      booking.status = 'cancelled';
      await booking.save();
    
      return res.status(200).json({
        message: 'Booking cancelled successfully',
        data: booking,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  };
  