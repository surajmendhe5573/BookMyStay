const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  hotelId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Hotel' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
