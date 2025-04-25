const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type: String,
    products: [{
        title: String,
        price: Number,
        discription: String,
        qty: Number,
        imageUrl: [String]
    }] 
});

module.exports = mongoose.model('sellers',sellerSchema);