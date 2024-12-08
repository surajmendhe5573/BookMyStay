const express = require("express");
const { getAllHotels, addHotel, getHotelById } = require("../controllers/hotel.controller");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.get("/",  getAllHotels); // Retrieve all hotels
router.post("/", authenticate, addHotel); // Add a new hotel (Admin only)
router.get("/:id", getHotelById); // Get hotel details by ID

module.exports = router;
