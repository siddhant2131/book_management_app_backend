const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const authMiddleware = require('./middleware/auth');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Register and Login routes
const { register, login } = require('./controllers/authController');
const { body } = require('express-validator');
const handleValidationErrors = require('./middleware/validation');

// Register route
app.post('/api/register', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], handleValidationErrors, register);

// Login route
app.post('/api/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').exists().withMessage('Password is required'),
], handleValidationErrors, login);

// Book routes - FIXED: Make sure this is properly mounted
app.use('/api/books', authMiddleware, bookRoutes);

// Handle undefined routes
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));