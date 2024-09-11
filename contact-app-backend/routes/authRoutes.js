const express = require('express');
const { signup, login } = require('../controllers/authControllers');
const {sendOtp, verifyOtp} = require('../controllers/gmailControllers');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;
