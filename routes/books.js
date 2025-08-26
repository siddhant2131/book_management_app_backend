// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const Book = require('../models/Book');

// const router = express.Router();

// // Get all books for authenticated user
// router.get('/', async (req, res) => {
//   try {
//     const books = await Book.find({ userId: req.user.id }).sort({ createdAt: -1 });
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Add a new book
// router.post('/', [
//   body('title').not().isEmpty().trim().escape(),
//   body('author').not().isEmpty().trim().escape()
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { title, author } = req.body;
//     const book = await Book.create({
//       title,
//       author,
//       userId: req.user.id
//     });

//     res.status(201).json(book);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

// Add this to your existing books routes
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;

    // Check if the book belongs to the user
    const book = await Book.findOne({ _id: id, userId: req.user.id });
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Update the likes
    book.likes = likes;
    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});