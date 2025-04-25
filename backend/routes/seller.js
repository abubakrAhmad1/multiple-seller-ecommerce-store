const express = require('express');
const router = express.Router();
const {signUp, signIn ,addProduct } = require('../controllers/sellerControllers');

router.post('/signUp', signUp);
router.post('/signIn',signIn);
router.post('/product',addProduct);


module.exports = router;