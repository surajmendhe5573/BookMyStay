// routes/booking.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const BOOKING_SERVICE_BASE_URL = process.env.BOOKING_SERVICE_BASE_URL || 'http://localhost:6000/api/bookings';

// Forward request to booking-service
// create a booking
router.post('/', async (req, res) => {
    try {
        const response = await axios.post(`${BOOKING_SERVICE_BASE_URL}`, req.body, {
            headers: {
                'Authorization': req.headers['authorization'], // Forward authorization token
            },
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// Get all bookings for a user
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${BOOKING_SERVICE_BASE_URL}`, {
            headers: {
                'Authorization': req.headers['authorization'], // Forward authorization token
            },
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// Get a specific booking by ID
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`${BOOKING_SERVICE_BASE_URL}/${req.params.id}`, {
            headers: {
                'Authorization': req.headers['authorization'], // Forward authorization token
            },
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// Cancel a booking
router.put('/:id/cancel', async (req, res) => {
    try {
        const response = await axios.put(`${BOOKING_SERVICE_BASE_URL}/${req.params.id}/cancel`, req.body, {
            headers: {
                'Authorization': req.headers['authorization'], // Forward authorization token
            },
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

module.exports = router;
