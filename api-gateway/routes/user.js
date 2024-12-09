// routes/user.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const USER_SERVICE_BASE_URL = process.env.USER_SERVICE_BASE_URL || 'http://localhost:4000/api/users';

// Forward request to user-service
router.post('/register', async (req, res) => {
    try {
        const response = await axios.post(`${USER_SERVICE_BASE_URL}/register`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${USER_SERVICE_BASE_URL}/login`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${USER_SERVICE_BASE_URL}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

router.put('/update/:userId', async (req, res) => {
    try {
        const response = await axios.put(`${USER_SERVICE_BASE_URL}/update/${req.params.userId}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});


module.exports = router; // This is fine, it's exporting the router object
