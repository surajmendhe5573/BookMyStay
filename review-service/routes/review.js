const express = require('express');
const { addReview, getReviews, updateReview, deleteReview } = require('../controllers/review.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', authenticateJWT, addReview);
router.get('/', getReviews); 
router.put('/edit/:id', authenticateJWT, updateReview);
router.delete('/delete/:id', authenticateJWT, deleteReview);

module.exports = router;
