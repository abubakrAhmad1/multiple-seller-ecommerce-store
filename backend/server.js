const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const buyerRoutes = require('./routes/buyer');

const app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.use('/buyer',buyerRoutes);

app.listen(8000,()=>console.log('Server is listening to port 8000'));