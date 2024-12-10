const express = require('express');
const router = express.Router();
const { sendNotification, getNotifications } = require('../controllers/notification.controller');
const { authenticate } = require('../../hotel-service/middleware/authMiddleware'); // Assuming shared middleware

router.post('/send', authenticate, sendNotification);
router.get('/', authenticate, getNotifications);

module.exports = router;
