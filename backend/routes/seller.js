const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { signUp, signIn, getProfile, updateProfile } = require('../controllers/sellerControllers');
const auth = require('../middleware/auth');

// Validation rules
const signUpValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('shopName').optional().trim(),
  body('phone').optional().trim(),
];

const signInValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Public routes
router.post('/signUp', signUpValidation, signUp);
router.post('/signIn', signInValidation, signIn);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;