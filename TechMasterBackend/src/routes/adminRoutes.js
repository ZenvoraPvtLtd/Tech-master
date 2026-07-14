const express = require('express');
const router = express.Router();
const { login, logout, changePassword, forgotPassword } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.post('/logout', logout);
router.put('/change-password', protect, changePassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;
