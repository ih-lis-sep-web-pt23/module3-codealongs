const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Schema describes and enforces the structure of the Book documents
const bookSchema = new Schema({
  title: { type: String, required: true },
  year: Number,
  codeISBN: { type: String, maxlength: 13, unique: true },
  quantity: { type: Number, min: 0, default: 0 },
  lastPublished: { type: Date, default: Date.now },
  genre: { type: String, enum: ['romance', 'fiction', 'bio', 'poetry'] },
  // "Author" is the model we are referencing and we want to connect to
  author: { type: Schema.Types.ObjectId, ref: 'Author' }
});

// Creating the model
const Book = model('Book', bookSchema);

module.exports = Book;
