const express = require('express');
const { initiatePayment,  getPaymentHistory, getPaymentById} = require('../controllers/payment.controller');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/initiate-payment', verifyToken,initiatePayment);
router.get('/history', verifyToken, getPaymentHistory);
router.get('/:id', verifyToken, getPaymentById);  // retrieving specific payment history

module.exports = router;

