const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// GET all books
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('books').find();
    const books = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving books.'
    });
  }
};

// GET single book by id
const getSingle = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Must use a valid book id to find a book.' });
    }

    const bookId = new ObjectId(id);
    const result = await mongodb.getDb().collection('books').findOne({ _id: bookId });

    if (!result) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving the book.'
    });
  }
};

// POST create book
const createBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      publishedYear: Number(req.body.publishedYear),
      genre: req.body.genre,
      pageCount: Number(req.body.pageCount),
      rating: Number(req.body.rating),
      language: req.body.language
    };

    const response = await mongodb.getDb().collection('books').insertOne(book);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json(response.error || { message: 'Some error occurred while creating the book.' });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while creating the book.'
    });
  }
};

// PUT update book
const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Must use a valid book id to update a book.' });
    }

    const bookId = new ObjectId(id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      publishedYear: Number(req.body.publishedYear),
      genre: req.body.genre,
      pageCount: Number(req.body.pageCount),
      rating: Number(req.body.rating),
      language: req.body.language
    };

    const response = await mongodb
      .getDb()
      .collection('books')
      .replaceOne({ _id: bookId }, book);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || { message: 'Some error occurred while updating the book.' });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while updating the book.'
    });
  }
};

// DELETE delete book
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Must use a valid book id to delete a book.' });
    }

    const bookId = new ObjectId(id);
    const response = await mongodb.getDb().collection('books').deleteOne({ _id: bookId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    if (response.acknowledged) {
      res.status(200).json({ message: 'Book successfully deleted.' });
    } else {
      res.status(500).json(response.error || { message: 'Some error occurred while deleting the book.' });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while deleting the book.'
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};
