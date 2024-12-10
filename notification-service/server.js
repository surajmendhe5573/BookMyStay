const express = require('express');
const app= express();
require('dotenv').config();

app.use(express.json());

const PORT = process.env.PORT || 5004;

// Start RabbitMQ Listener
// listenForMessages();

require('./config/rabbitmq.config')
require('./db/DB');

app.use('/api/notifications', require('./routes/notification'));

app.listen(PORT, () => {
  console.log(`Notification Service is running on http://localhost:${PORT}`);
});



