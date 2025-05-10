const express = require('express');
const axios = require('axios');
const router = express.Router();

const HOTEL_SERVICE_BASE_URL = process.env.HOTEL_SERVICE_BASE_URL || 'http://localhost:4000/api/hotels';

// Forward request to hotel-service
// get all hotels
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${HOTEL_SERVICE_BASE_URL}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// add a new hotel (admin only)
router.post('/', async (req, res) => {
    try {
        const response = await axios.post(`${HOTEL_SERVICE_BASE_URL}`, req.body, {
            headers: {
                Authorization: req.headers.authorization
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// get specific hotel details by id
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`${HOTEL_SERVICE_BASE_URL}/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// update hotel details (admin only)
router.put('/:id', async (req, res) => {
    try {
        const response = await axios.put(`${HOTEL_SERVICE_BASE_URL}/${req.params.id}`, req.body, {
            headers: {
                Authorization: req.headers.authorization
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// Retrieve room availability for a specific hotel
router.get('/:id/rooms', async (req, res) => {
    try {
        const response = await axios.get(`${HOTEL_SERVICE_BASE_URL}/${req.params.id}/rooms`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// delete a hotel (admin only)
router.delete('/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${HOTEL_SERVICE_BASE_URL}/${req.params.id}`, {
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
