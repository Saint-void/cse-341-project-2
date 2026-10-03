const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { saveBook, validateId } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

// GET all books
router.get('/', (req, res, next) => {
  /*
    #swagger.tags = ['Books']
    #swagger.summary = 'Get all books'
    #swagger.description = 'Retrieves an array of all books stored in MongoDB.'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.responses[200] = {
      description: 'List of books retrieved successfully',
      schema: [{ $ref: '#/definitions/Book' }]
    }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[401] = { description: 'Authentication required' }
  */
  booksController.getAll(req, res, next);
});

// GET single book by ID
router.get('/:id', validateId, (req, res, next) => {
  /*
    #swagger.tags = ['Books']
    #swagger.summary = 'Get a book by ID'
    #swagger.description = 'Retrieves a single book document matching the specified 24-character hexadecimal ObjectId.'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.parameters['id'] = { description: 'MongoDB Book ObjectId' }
    #swagger.responses[200] = {
      description: 'Book retrieved successfully',
      schema: { $ref: '#/definitions/Book' }
    }
    #swagger.responses[400] = { description: 'Invalid ID format' }
    #swagger.responses[404] = { description: 'Book not found' }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[401] = { description: 'Authentication required' }
  */
  booksController.getSingle(req, res, next);
});

// POST create a new book
router.post('/', saveBook, (req, res, next) => {
  /*
    #swagger.tags = ['Books']
    #swagger.summary = 'Create a new book'
    #swagger.description = 'Creates a new book record with 8 required fields: title, author, isbn, publishedYear, genre, pageCount, rating, language.'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Book object to create',
      required: true,
      schema: { $ref: '#/definitions/BookInput' }
    }
    #swagger.responses[201] = {
      description: 'Book created successfully with inserted ID'
    }
    #swagger.responses[400] = { description: 'Validation failed' }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[401] = { description: 'Authentication required' }
  */
  booksController.createBook(req, res, next);
});

// PUT update an existing book
router.put('/:id', validateId, saveBook, (req, res, next) => {
  /*
    #swagger.tags = ['Books']
    #swagger.summary = 'Update a book'
    #swagger.description = 'Updates an existing book by replacing its document fields.'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.parameters['id'] = { description: 'MongoDB Book ObjectId' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated book data',
      required: true,
      schema: { $ref: '#/definitions/BookInput' }
    }
    #swagger.responses[204] = { description: 'Book updated successfully' }
    #swagger.responses[400] = { description: 'Validation failed or invalid ID format' }
    #swagger.responses[404] = { description: 'Book not found' }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[401] = { description: 'Authentication required' }
  */
  booksController.updateBook(req, res, next);
});

// DELETE a book
router.delete('/:id', validateId, (req, res, next) => {
  /*
    #swagger.tags = ['Books']
    #swagger.summary = 'Delete a book'
    #swagger.description = 'Deletes a book document by its 24-character hexadecimal ObjectId.'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.parameters['id'] = { description: 'MongoDB Book ObjectId' }
    #swagger.responses[200] = { description: 'Book deleted successfully' }
    #swagger.responses[400] = { description: 'Invalid ID format' }
    #swagger.responses[404] = { description: 'Book not found' }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[401] = { description: 'Authentication required' }
  */
  booksController.deleteBook(req, res, next);
});

module.exports = router;
