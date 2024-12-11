const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors= require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// API Gateway routes
app.use('/api/users', require('./routes/user'));
app.use('/api/hotels', require('./routes/hotel'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/payments', require('./routes/payment'));
app.use('/api/notifications', require('./routes/notification'));
app.use('/api/reviews', require('./routes/review'));

app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`);
});
