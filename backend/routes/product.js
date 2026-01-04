const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  getMyProducts,
  addReview,
  getCategories,
} = require('../controllers/productControllers');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Validation rules
const productValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('category').trim().notEmpty().withMessage('Category is required'),
];

const reviewValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim(),
];

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/seller/:sellerId', getSellerProducts);
router.get('/:id', getProduct);

// Protected routes - Seller
router.post(
  '/',
  auth,
  upload.array('images', 5),
  productValidation,
  createProduct
);
router.get('/my-products', auth, getMyProducts);
router.put('/:id', auth, upload.array('images', 5), updateProduct);
router.delete('/:id', auth, deleteProduct);

// Protected routes - Buyer
router.post('/:id/reviews', auth, reviewValidation, addReview);

module.exports = router;

