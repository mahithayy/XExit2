const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Register employee
router.post('/register', register);

// Login (for both employee and admin)
router.post('/login', login);

module.exports = router;
