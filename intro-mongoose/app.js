const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const Book = require('./models/Book.model');
const Author = require('./models/Author.model');

const app = express();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      'mongodb://localhost/intro-mongoose'
    );

    console.log(`Connected to database: ${connection.connections[0].name}`);
  } catch (error) {
    console.log('Error connecting to mongodb', error);
  }
};

connectDB();

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());

// CRUD: CREATE
app.post('/books', async (req, res) => {
  const { title, year, codeISBN, quantity, genre, author } = req.body;

  try {
    const createdBook = await Book.create({
      title,
      year,
      codeISBN,
      quantity,
      genre,
      author
    });

    console.log('Book created:', createdBook);
    res.status(201).send(createdBook);
  } catch (error) {
    console.log('Error creating the book', error);
    res.status(500).send({ error: 'Failed to create the book' });
  }
});

// CRUD: READ
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});

    // Book.find({title: "Best book ever"})

    console.log('All books:', books);
    res.status(200).send(books);
  } catch (error) {
    console.log('Error retrieving all books', error);
    res.status(500).send({ error: 'Failed to retrieve all books' });
  }
});

// CRUD: UPDATE
app.put('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true
    });

    console.log('Updated book', updatedBook);

    res.status(200).send(updatedBook);
  } catch (error) {
    console.log('Error while updating book', error);
    res.status(500).send({ error: 'Failed to update book' });
  }
});

// CRUD: DELETE
app.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    await Book.findByIdAndDelete(bookId);

    console.log('Book deleted!');
    res.status(204).send();
  } catch (error) {
    console.log('Error while deleting book', error);
    res.status(500).send({ error: 'Failed to delete book' });
  }
});

app.get('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId).populate('author');

    console.log('Book', book);

    res.status(200).send(book);
  } catch (error) {
    console.log('Error while getting the book', error);
    res.status(500).send({ error: 'Failed to get book' });
  }
});

app.post('/authors', async (req, res) => {
  const { firstName, lastName, bio } = req.body;
  try {
    const createdAuthor = await Author.create({
      firstName,
      lastName,
      bio
    });

    console.log('Author added', createdAuthor);
    res.status(201).send(createdAuthor);
  } catch (error) {
    console.log('Error while creating auhtor', error);
    res.status(500).send({ error: 'Failed to create author' });
  }
});

app.listen(3000, () => console.log('App running on port 3000'));
