const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    disc: String,
    qty: Number,
    images: [String],
});

module.exports = mongoose.model('Product', productSchema);
