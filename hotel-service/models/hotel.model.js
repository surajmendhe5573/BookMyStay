const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  rooms: [roomSchema], // Array of room details
});

module.exports = mongoose.model("Hotel", hotelSchema);
