const paypal = require('@paypal/checkout-server-sdk');
const axios= require('axios');
const Payment = require('../models/payment.model');
const Booking = require('../../booking-service/models/booking.model');
const paypalClient = require('../config/paypalClient'); 

exports.initiatePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const bookingServiceUrl = 'http://localhost:5002/api/bookings';
    console.log(`Fetching booking details from ${bookingServiceUrl}/${bookingId}`);

    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const bookingResponse = await axios.get(`${bookingServiceUrl}/${bookingId}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log("Booking response data:", bookingResponse.data);

    if (bookingResponse.status !== 200 || !bookingResponse.data || !bookingResponse.data.data) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    const booking = bookingResponse.data.data; // Accessing the data property
    const amount = booking.totalPrice;

    // Debug: Check the type and value of totalPrice
    console.log("Total Price type:", typeof amount);
    console.log("Total Price value:", amount);

    // Check if the amount is valid
    if (isNaN(amount)) {
      return res.status(400).json({ message: 'Invalid booking price.' });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount.toFixed(2),
          },
        },
      ],
    });

    const response = await paypalClient.execute(request);
    console.log("PayPal response:", response.result);

    const payment = new Payment({
      userId: req.user.id,
      bookingId,
      amount,
      paymentId: response.result.id,
      status: 'COMPLETED',
    });

    await payment.save();

    res.status(201).json({
      approvalUrl: response.result.links.find(link => link.rel === 'approve').href,
      payment,
    });
  } catch (error) {
    console.error("Error initiating payment:", error);

    if (error.response) {
      console.error("Error response from booking service:", error.response.data);
      return res.status(error.response.status).json({
        message: error.response.data.message || 'Error fetching booking details.',
      });
    }

    if (error.name === 'HttpException' || error instanceof Error) {
      console.error("PayPal SDK error:", error);
      return res.status(400).json({
        message: 'Error processing PayPal payment.',
        details: error.message,
      });
    }

    res.status(500).json({ message: 'Error initiating payment.', error: error.message });
  }
};

// Retrieve Payement History
exports.getPaymentHistory = async (req, res) => {
  try {
    // Retrieve payments from the database for the logged-in user
    const payments = await Payment.find({ userId: req.user.id }).sort({ createdAt: -1 }); // Sort by most recent payments

    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payments found for this user.' });
    }

    res.status(200).json({ payments });
  } catch (error) {
    console.error("Error retrieving payment history:", error);
    res.status(500).json({ message: 'Error retrieving payment history.', error: error.message });
  }
};

// Retrieving specific payment details by Id.
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params; // Extract payment ID from the URL parameters

    // Find the payment by its ID and make sure it belongs to the logged-in user
    const payment = await Payment.findOne({ 
      _id: id, 
      userId: req.user.id 
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found or you do not have access to this payment.' });
    }

    res.status(200).json({ payment });
  } catch (error) {
    console.error("Error retrieving payment details:", error);
    res.status(500).json({ message: 'Error retrieving payment details.', error: error.message });
  }
};