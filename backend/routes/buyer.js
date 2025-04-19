const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controllers/buyerControllers');

router.post('/', addProduct);     // POST /api/products
router.get('/', getProducts);     // GET /api/products

module.exports = router;
