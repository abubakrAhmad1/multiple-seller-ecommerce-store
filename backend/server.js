require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const buyerRoutes = require('./routes/buyer');
const sellerRoutes = require('./routes/seller');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to database
connectDB().catch((error) => {
  console.error('Failed to connect to database. Server will start but database operations will fail.');
  console.error('Please start MongoDB and restart the server.');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));