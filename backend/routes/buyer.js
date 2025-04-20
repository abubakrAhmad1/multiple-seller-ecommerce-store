const express = require('express');
const router = express.Router();
const { signIn, signUp } = require('../controllers/buyerControllers');

router.post('/signIn', signIn);     //'http://localhost:8000/buyer/signup'
router.post('/signUp', signUp);     

module.exports = router;
