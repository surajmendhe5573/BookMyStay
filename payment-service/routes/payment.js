const express = require('express');
const { initiatePayment } = require('../controllers/payment.controller');
const { createPayment } = require('../controllers/payment.controller');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/initiate-payment', verifyToken,initiatePayment);

module.exports = router;

