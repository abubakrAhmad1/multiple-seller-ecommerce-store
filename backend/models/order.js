const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buyers',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sellers',
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveredDate: Date
});

module.exports = mongoose.model('orders', orderSchema);

