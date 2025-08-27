const Book = require('../models/Book');

// Get all books for authenticated user
exports.getBooks = async (req, res) => {
  try {
    console.log('Fetching books for user:', req.user._id);
    const books = await Book.find({ userId: req.user._id }).sort({ createdAt: -1 });
    console.log('Found books:', books);
    res.json(books);
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error while fetching books' });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    
    console.log('Adding book:', { title, author, userId: req.user._id });

    const book = await Book.create({
      title,
      author,
      userId: req.user._id,
    });

    console.log('Book created:', book);
    res.status(201).json(book);
  } catch (error) {
    console.error('Add book error:', error);
    res.status(500).json({ message: 'Server error while adding book' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('Deleting book:', id, 'for user:', req.user._id);

    const book = await Book.findOne({ _id: id, userId: req.user._id });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Server error while deleting book' });
  }
};