const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  publicationYear: {
    type: Number,
    required: true,
    min: 1900, // Change this minimum value to an appropriate year
    max: new Date().getFullYear() // Set the maximum to the current year
  }
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
