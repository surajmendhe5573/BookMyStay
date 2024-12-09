const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// API Gateway routes
app.use('/api/users', require('./routes/user'));

app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`);
});
