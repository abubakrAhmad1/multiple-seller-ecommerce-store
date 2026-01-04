const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Quantity cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        trim: true
    },
    images: [{
        type: String
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers',
        required: true
    },
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'buyers'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'out_of_stock'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Index for search functionality
productSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('products', productSchema);

