const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const REVIEW_SERVICE_BASE_URL = process.env.REVIEW_SERVICE_BASE_URL || 'http://localhost:5005/api/reviews';

// Forward request to review-service
// Add a new review
router.post('/', async (req, res) => {
    try {
        const response = await axios.post(`${REVIEW_SERVICE_BASE_URL}`, req.body, {
            headers: {
                Authorization: req.headers.authorization
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// Get reviews for a hotel
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${REVIEW_SERVICE_BASE_URL}`, {
            params: req.query
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// Update a review
router.put('/edit/:id', async (req, res) => {
    try {
        const response = await axios.put(`${REVIEW_SERVICE_BASE_URL}/edit/${req.params.id}`, req.body, {
            headers: {
                Authorization: req.headers.authorization
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// Delete a review
router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${REVIEW_SERVICE_BASE_URL}/delete/${req.params.id}`, {
            headers: {
                Authorization: req.headers.authorization
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

module.exports = router;
