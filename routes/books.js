const express = require('express');
const { body } = require('express-validator');
const { getBooks, addBook, deleteBook } = require('../controllers/bookController');
const handleValidationErrors = require('../middleware/validation');

const router = express.Router();

// Validation rules
const bookValidation = [
  body('title').not().isEmpty().trim().escape().withMessage('Title is required'),
  body('author').not().isEmpty().trim().escape().withMessage('Author is required'),
];

// Routes
router.get('/', getBooks);
router.post('/', bookValidation, handleValidationErrors, addBook);
router.delete('/:id', deleteBook);

module.exports = router;