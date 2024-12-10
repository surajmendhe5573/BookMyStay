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
      status: 'PENDING',
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
