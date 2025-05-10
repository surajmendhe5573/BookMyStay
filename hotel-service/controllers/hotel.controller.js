const Hotel = require("../models/hotel.model");

// Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hotels", error });
  }
};

// Add a new hotel (Admin only)
const addHotel = async (req, res) => {
  try {
    const { name, location, description, rooms } = req.body;

    // Check if user is admin
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Unauthorized (only admin can add hotel)" });
    }

    const newHotel = new Hotel({ name, location, description, rooms });
    await newHotel.save();

    res.status(201).json({ message: "Hotel added successfully", hotel: newHotel });
  } catch (error) {
    res.status(500).json({ message: "Error adding hotel", error });
  }
};

// Get hotel details by ID
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hotel", error });
  }
};

// Update hotel details (Admin only)
const updateHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is admin
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Unauthorized (only admin can update hotel details)" });
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel updated successfully", hotel: updatedHotel });
  } catch (error) {
    res.status(500).json({ message: "Error updating hotel", error });
  }
};

// Retrieve room availability for a specific hotel
const getHotelRooms = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ rooms: hotel.rooms });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving room availability", error });
  }
};

const deleteHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is admin
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Unauthorized (only admin can delete hotel)" });
    }

    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel deleted successfully", hotel: deletedHotel });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hotel", error });
  }
};


module.exports = { getAllHotels, addHotel, getHotelById, updateHotelById, getHotelRooms, deleteHotelById };
