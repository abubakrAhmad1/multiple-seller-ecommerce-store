const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type: String,
});

module.exports = mongoose.model('buyers', buyerSchema);
