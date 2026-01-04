const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Buyer = require('../models/buyer');
const Product = require('../models/product');
const Order = require('../models/order');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id, type: 'buyer' }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new buyer
// @route   POST /buyer/signUp
// @access  Public
exports.signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    // Check if buyer already exists
    const buyerExists = await Buyer.findOne({ email });
    if (buyerExists) {
      return res.status(400).json({ message: 'Buyer already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create buyer
    const buyer = await Buyer.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    if (buyer) {
      res.status(201).json({
        _id: buyer._id,
        name: buyer.name,
        email: buyer.email,
        type: 'buyer',
        token: generateToken(buyer._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid buyer data' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Authenticate a buyer
// @route   POST /buyer/signIn
// @access  Public
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for buyer email
    const buyer = await Buyer.findOne({ email });

    if (buyer && (await bcrypt.compare(password, buyer.password))) {
      res.json({
        _id: buyer._id,
        name: buyer.name,
        email: buyer.email,
        type: 'buyer',
        token: generateToken(buyer._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get buyer profile
// @route   GET /buyer/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id).select('-password');
    if (buyer) {
      res.json(buyer);
    } else {
      res.status(404).json({ message: 'Buyer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update buyer profile
// @route   PUT /buyer/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id);

    if (buyer) {
      buyer.name = req.body.name || buyer.name;
      buyer.email = req.body.email || buyer.email;
      buyer.phone = req.body.phone || buyer.phone;
      if (req.body.address) {
        buyer.address = { ...buyer.address, ...req.body.address };
      }

      const updatedBuyer = await buyer.save();
      res.json({
        _id: updatedBuyer._id,
        name: updatedBuyer.name,
        email: updatedBuyer.email,
        phone: updatedBuyer.phone,
        address: updatedBuyer.address,
      });
    } else {
      res.status(404).json({ message: 'Buyer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get buyer cart
// @route   GET /buyer/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id).populate('cart.product');
    if (buyer) {
      res.json(buyer.cart);
    } else {
      res.status(404).json({ message: 'Buyer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add item to cart
// @route   POST /buyer/cart
// @access  Private
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const buyer = await Buyer.findById(req.user.id);
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const existingItem = buyer.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      buyer.cart.push({ product: productId, quantity: quantity || 1 });
    }

    await buyer.save();
    const updatedBuyer = await Buyer.findById(req.user.id).populate('cart.product');
    res.json(updatedBuyer.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /buyer/cart/:productId
// @access  Private
exports.removeFromCart = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id);
    buyer.cart = buyer.cart.filter(
      (item) => item.product.toString() !== req.params.productId
    );
    await buyer.save();
    const updatedBuyer = await Buyer.findById(req.user.id).populate('cart.product');
    res.json(updatedBuyer.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /buyer/cart/:productId
// @access  Private
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const buyer = await Buyer.findById(req.user.id);
    const item = buyer.cart.find(
      (item) => item.product.toString() === req.params.productId
    );

    if (item) {
      item.quantity = quantity;
      await buyer.save();
      const updatedBuyer = await Buyer.findById(req.user.id).populate('cart.product');
      res.json(updatedBuyer.cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get buyer orders
// @route   GET /buyer/orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate('items.product')
      .populate('items.seller')
      .sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
