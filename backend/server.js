const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const buyerRoutes = require('./routes/buyer');
const sellerRoutes = require('./routes/seller');

const app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.use('/buyer',buyerRoutes);
app.use('/seller',sellerRoutes);

app.listen(8000,()=>console.log('Server is listening to port 8000'));