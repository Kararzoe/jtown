const express = require('express');
const { register, login, getProfile, updateProfile, forgotPassword, resetPassword, sendLoginCode, verifyLoginCode, verifySignup } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/verify-signup', verifySignup);
router.post('/login', login);
router.post('/send-login-code', sendLoginCode);
router.post('/verify-login-code', verifyLoginCode);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
