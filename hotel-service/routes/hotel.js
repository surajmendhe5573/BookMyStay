const express = require("express");
const { getAllHotels, addHotel, getHotelById, updateHotelById, getHotelRooms } = require("../controllers/hotel.controller");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.get("/",  getAllHotels); // Retrieve all hotels
router.post("/", authenticate, addHotel); // Add a new hotel (Admin only)
router.get("/:id", getHotelById); // Get hotel details by ID
router.put("/:id", authenticate, updateHotelById); // Update hotel details (Admin only)
router.get("/:id/rooms", getHotelRooms);  // Retrieve room availability for a specific hotel

module.exports = router;
