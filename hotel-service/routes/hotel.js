const express = require("express");
const { getAllHotels, addHotel, getHotelById, updateHotelById, getHotelRooms, deleteHotelById } = require("../controllers/hotel.controller");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",  getAllHotels); 
router.post("/", authenticate, addHotel); 
router.get("/:id", getHotelById); 
router.put("/:id", authenticate, updateHotelById); 
router.get("/:id/rooms", getHotelRooms);  
router.delete("/:id", authenticate, deleteHotelById);  


module.exports = router;
