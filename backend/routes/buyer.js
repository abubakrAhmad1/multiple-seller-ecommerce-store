const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  signIn,
  signUp,
  getProfile,
  updateProfile,
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  getOrders,
} = require('../controllers/buyerControllers');
const auth = require('../middleware/auth');

// Validation rules
const signUpValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().trim(),
];

const signInValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Public routes
router.post('/signIn', signInValidation, signIn);
router.post('/signUp', signUpValidation, signUp);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/cart', auth, getCart);
router.post('/cart', auth, addToCart);
router.delete('/cart/:productId', auth, removeFromCart);
router.put('/cart/:productId', auth, updateCartItem);
router.get('/orders', auth, getOrders);

module.exports = router;
