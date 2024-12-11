const Review = require('../models/review.models');

// Add a Review
const addReview = async (req, res) => {
  const { hotelId, rating, reviewText } = req.body;
  const userId = req.user.id;

  try {
    const newReview = new Review({ userId, hotelId, rating, reviewText });
    await newReview.save();

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding review' });
  }
};

// Retrieve Reviews for a Hotel
const getReviews = async (req, res) => {
    const { hotelId } = req.query;
  
    // Check if hotelId exists in the query
    if (!hotelId) {
      return res.status(400).json({ message: 'Hotel ID is required' });
    }
  
    try {
      const reviews = await Review.find({ hotelId });

      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found for this hotel' });
      }
  
      res.status(200).json({ reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching reviews' });
    }
  };
  
// Update a Review
const updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, reviewText } = req.body;
    const userId = req.user.id;
  
    try {
      const review = await Review.findOne({ _id: id, userId });
  
      if (!review) {
        return res.status(404).json({ message: 'Review not found or not authorized' });
      }
  
      review.rating = rating || review.rating;
      review.reviewText = reviewText || review.reviewText;
      review.updatedAt = Date.now();
  
      await review.save();
  
      res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating review' });
    }
  };
  
// Delete a Review
const deleteReview = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const review = await Review.findOneAndDelete({ _id: id, userId });
  
      if (!review) {
        return res.status(404).json({ message: 'Review not found or not authorized' });
      }
  
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting review' });
    }
  };
  

module.exports = { addReview, getReviews, updateReview, deleteReview };
