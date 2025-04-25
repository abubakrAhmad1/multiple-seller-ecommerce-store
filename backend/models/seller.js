const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type: String,
});

module.exports = mongoose.model('sellers',sellerSchema);