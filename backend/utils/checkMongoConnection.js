const mongoose = require('mongoose');

// Helper function to check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Middleware to check MongoDB connection before database operations
const requireMongoConnection = (req, res, next) => {
  if (!isMongoConnected()) {
    return res.status(503).json({
      message: 'Database connection unavailable. Please ensure MongoDB is running.',
      error: 'MongoDB not connected'
    });
  }
  next();
};

module.exports = { isMongoConnected, requireMongoConnection };

