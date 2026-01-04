const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Seller = require('../models/seller');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id, type: 'seller' }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new seller
// @route   POST /seller/signUp
// @access  Public
exports.signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, shopName, phone } = req.body;

    // Check if seller already exists
    const sellerExists = await Seller.findOne({ email });
    if (sellerExists) {
      return res.status(400).json({ message: 'Seller already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create seller
    const seller = await Seller.create({
      name,
      email,
      password: hashedPassword,
      shopName,
      phone,
    });

    if (seller) {
      res.status(201).json({
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        shopName: seller.shopName,
        token: generateToken(seller._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid seller data' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Authenticate a seller
// @route   POST /seller/signIn
// @access  Public
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for seller email
    const seller = await Seller.findOne({ email });

    if (seller && (await bcrypt.compare(password, seller.password))) {
      res.json({
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        shopName: seller.shopName,
        type: 'seller',
        token: generateToken(seller._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get seller profile
// @route   GET /seller/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user.id).select('-password');
    if (seller) {
      res.json(seller);
    } else {
      res.status(404).json({ message: 'Seller not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update seller profile
// @route   PUT /seller/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user.id);

    if (seller) {
      seller.name = req.body.name || seller.name;
      seller.email = req.body.email || seller.email;
      seller.shopName = req.body.shopName || seller.shopName;
      seller.phone = req.body.phone || seller.phone;
      if (req.body.address) {
        seller.address = { ...seller.address, ...req.body.address };
      }

      const updatedSeller = await seller.save();
      res.json({
        _id: updatedSeller._id,
        name: updatedSeller.name,
        email: updatedSeller.email,
        shopName: updatedSeller.shopName,
        phone: updatedSeller.phone,
        address: updatedSeller.address,
      });
    } else {
      res.status(404).json({ message: 'Seller not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};