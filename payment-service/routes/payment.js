const express = require('express');
const { initiatePayment,  getPaymentHistory} = require('../controllers/payment.controller');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/initiate-payment', verifyToken,initiatePayment);
router.get('/history', verifyToken, getPaymentHistory);

module.exports = router;

