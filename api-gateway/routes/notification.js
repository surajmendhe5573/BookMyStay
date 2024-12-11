const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const NOTIFICATION_SERVICE_BASE_URL = process.env.NOTIFICATION_SERVICE_BASE_URL || 'http://localhost:5004/api/notifications';

router.post('/send', async (req, res) => {
    try {
           console.log('Forwarding request to Notification Service:', req.body);
        const response = await axios.post(`${NOTIFICATION_SERVICE_BASE_URL}/send`, req.body, {
            headers: req.headers  // forward headers (e.g., authorization token) if necessary
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

// router.post('/send', async (req, res) => {
//     try {
//         console.log('Forwarding request to Notification Service:', req.body);
//         const response = await axios.post(`${NOTIFICATION_SERVICE_BASE_URL}/send`, req.body, {
//             headers: req.headers
//         });
//         res.status(response.status).json(response.data);
//     } catch (error) {
//         console.error('Error in Notification Service:', error.response?.data || error.message);
//         res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
//     }
// });


// Get all notifications
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${NOTIFICATION_SERVICE_BASE_URL}`, {
            headers: req.headers  // forward headers (e.g., authorization token) if necessary
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
});

module.exports = router;
