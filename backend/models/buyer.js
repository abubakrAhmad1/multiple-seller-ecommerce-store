const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    type: {
        type: String,
        default: 'buyer'
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('buyers', buyerSchema);
