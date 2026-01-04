const Product = require('../models/product');
const Seller = require('../models/seller');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

// @desc    Get all products with search, filter, and pagination
// @route   GET /products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    // Build query
    let query = { status: 'active' };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice > 0 || maxPrice < Infinity) {
      query.price = {};
      if (minPrice > 0) query.price.$gte = minPrice;
      if (maxPrice < Infinity) query.price.$lte = maxPrice;
    }

    // Execute query
    const products = await Product.find(query)
      .populate('seller', 'name shopName email')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single product
// @route   GET /products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name shopName email rating')
      .populate('reviews.user', 'name email');

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new product
// @route   POST /products
// @access  Private (Seller)
exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, price, quantity, category } = req.body;

    // Handle image uploads
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const product = await Product.create({
      title,
      description,
      price,
      quantity,
      category,
      images,
      seller: req.user.id,
    });

    const populatedProduct = await Product.findById(product._id)
      .populate('seller', 'name shopName email');

    res.status(201).json(populatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update product
// @route   PUT /products/:id
// @access  Private (Seller - owner only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if seller owns the product
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    // Update fields
    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.price = req.body.price !== undefined ? req.body.price : product.price;
    product.quantity = req.body.quantity !== undefined ? req.body.quantity : product.quantity;
    product.category = req.body.category || product.category;
    product.status = req.body.status || product.status;

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      product.images = [...product.images, ...newImages];
    }

    const updatedProduct = await product.save();
    const populatedProduct = await Product.findById(updatedProduct._id)
      .populate('seller', 'name shopName email');

    res.json(populatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete product
// @route   DELETE /products/:id
// @access  Private (Seller - owner only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if seller owns the product
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    // Delete associated images
    product.images.forEach(image => {
      const imagePath = path.join(__dirname, '..', image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get seller's products
// @route   GET /products/seller/:sellerId
// @access  Public
exports.getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.sellerId, status: 'active' })
      .populate('seller', 'name shopName email')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get seller's own products
// @route   GET /products/my-products
// @access  Private (Seller)
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id })
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add review to product
// @route   POST /products/:id/reviews
// @access  Private (Buyer)
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed
    const existingReview = product.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Add review
    product.reviews.push({
      user: req.user.id,
      rating,
      comment,
    });

    // Update average rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.rating.average = totalRating / product.reviews.length;
    product.rating.count = product.reviews.length;

    await product.save();
    const updatedProduct = await Product.findById(req.params.id)
      .populate('reviews.user', 'name email');

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get product categories
// @route   GET /products/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

