const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// GET all authors
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('authors').find();
    const authors = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving authors.'
    });
  }
};

// GET single author by id
const getSingle = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Must use a valid author id to find an author.' });
    }

    const authorId = new ObjectId(id);
    const result = await mongodb.getDb().collection('authors').findOne({ _id: authorId });

    if (!result) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving the author.'
    });
  }
};

// POST create author
const createAuthor = async (req, res) => {
  try {
    const author = {
      name: req.body.name,
      bio: req.body.bio,
      nationality: req.body.nationality,
      birthYear: Number(req.body.birthYear),
      website: req.body.website
    };

    const response = await mongodb.getDb().collection('authors').insertOne(author);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json(response.error || { message: 'Some error occurred while creating the author.' });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while creating the author.'
    });
  }
};

// PUT update author
const updateAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Must use a valid author id to update an author.' });
    }

    const authorId = new ObjectId(id);
    const author = {
      name: req.body.name,
      bio: req.body.bio,
      nationality: req.body.nationality,
      birthYear: Number(req.body.birthYear),
      website: req.body.website
    };

    const response = await mongodb
      .getDb()
      .collection('authors')
      .replaceOne({ _id: authorId }, author);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || { message: 'Some error occurred while updating the author.' });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while updating the author.'
    });
  }
};

// DELETE delete author
const deleteAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Must use a valid author id to delete an author.' });
    }

    const authorId = new ObjectId(id);
    const response = await mongodb.getDb().collection('authors').deleteOne({ _id: authorId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    if (response.acknowledged) {
      res.status(200).json({ message: 'Author successfully deleted.' });
    } else {
      res.status(500).json(response.error || { message: 'Some error occurred while deleting the author.' });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while deleting the author.'
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
