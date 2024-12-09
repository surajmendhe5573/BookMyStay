const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Database is connected');
    })
    .catch((err) => {
      console.error('Database connection error:', err.message);
    });
};

connectDB();

module.exports = connectDB;
