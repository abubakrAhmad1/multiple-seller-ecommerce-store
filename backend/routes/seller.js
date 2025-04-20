const express = require('express');
const router = express.Router();
const {signUp } = require('../controllers/sellerControllers');

router.post('/signUp', signUp);
// router.post('/signIn',signIn);


module.exports = router;