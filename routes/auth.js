const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const handleValidationErrors = require('../middleware/validation');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').exists().withMessage('Password is required'),
];

// Routes - FIXED: Remove /auth prefix to match frontend expectations
router.post('/register', registerValidation, handleValidationErrors, register);
router.post('/login', loginValidation, handleValidationErrors, login);

module.exports = router;