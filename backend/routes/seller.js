const express = require('express');
const router = express.Router();
const {signUp, signIn } = require('../controllers/sellerControllers');

router.post('/signUp', signUp);
router.post('/signIn',signIn);


module.exports = router;