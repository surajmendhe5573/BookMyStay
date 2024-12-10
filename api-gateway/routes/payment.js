// routes/payment.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const PAYMENT_SERVICE_BASE_URL = process.env.PAYMENT_SERVICE_BASE_URL || 'http://localhost:5003/api/payments';

// Initiate payment
router.post('/initiate-payment', async (req, res) => {
    try {
        const response = await axios.post(`${PAYMENT_SERVICE_BASE_URL}/initiate-payment`, req.body, {
            headers: {
                'Authorization': req.headers['authorization'], // Forward authorization token
            },
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// Get payment history
router.get('/history', async (req, res) => {
    try {
        const response = await axios.get(`${PAYMENT_SERVICE_BASE_URL}/history`, {
            headers: {
                'Authorization': req.headers['authorization'], // Forward authorization token
            },
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// Get specific payment by ID
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`${PAYMENT_SERVICE_BASE_URL}/${req.params.id}`, {
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
