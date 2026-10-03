const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const { saveAuthor, validateId } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

// GET all authors
router.get('/', (req, res, next) => {
  /*
    #swagger.tags = ['Authors']
    #swagger.summary = 'Get all authors'
    #swagger.description = 'Retrieves an array of all authors stored in MongoDB.'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.responses[200] = {
      description: 'List of authors retrieved successfully',
      schema: [{ $ref: '#/definitions/Author' }]
    }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[401] = { description: 'Authentication required' }
  */
  authorsController.getAll(req, res, next);
});

// GET single author by ID
router.get('/:id', validateId, (req, res, next) => {
  /*
    #swagger.tags = ['Authors']
    #swagger.summary = 'Get an author by ID'
    #swagger.description = 'Retrieves a single author document matching the specified 24-character hexadecimal ObjectId.'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.parameters['id'] = { description: 'MongoDB Author ObjectId' }
    #swagger.responses[200] = {
      description: 'Author retrieved successfully',
      schema: { $ref: '#/definitions/Author' }
    }
    #swagger.responses[400] = { description: 'Invalid ID format' }
    #swagger.responses[404] = { description: 'Author not found' }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[401] = { description: 'Authentication required' }
  */
  authorsController.getSingle(req, res, next);
});

// POST create a new author
router.post('/', saveAuthor, (req, res, next) => {
  /*
    #swagger.tags = ['Authors']
    #swagger.summary = 'Create a new author'
    #swagger.description = 'Creates a new author record with required fields: name, bio, nationality, birthYear, website.'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Author object to create',
      required: true,
      schema: { $ref: '#/definitions/AuthorInput' }
    }
    #swagger.responses[201] = {
      description: 'Author created successfully with inserted ID'
    }
    #swagger.responses[400] = { description: 'Validation failed' }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[401] = { description: 'Authentication required' }
  */
  authorsController.createAuthor(req, res, next);
});

// PUT update an existing author
router.put('/:id', validateId, saveAuthor, (req, res, next) => {
  /*
    #swagger.tags = ['Authors']
    #swagger.summary = 'Update an author'
    #swagger.description = 'Updates an existing author by replacing its document fields.'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.parameters['id'] = { description: 'MongoDB Author ObjectId' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated author data',
      required: true,
      schema: { $ref: '#/definitions/AuthorInput' }
    }
    #swagger.responses[204] = { description: 'Author updated successfully' }
    #swagger.responses[400] = { description: 'Validation failed or invalid ID format' }
    #swagger.responses[404] = { description: 'Author not found' }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[401] = { description: 'Authentication required' }
  */
  authorsController.updateAuthor(req, res, next);
});

// DELETE an author
router.delete('/:id', validateId, (req, res, next) => {
  /*
    #swagger.tags = ['Authors']
    #swagger.summary = 'Delete an author'
    #swagger.description = 'Deletes an author document by its 24-character hexadecimal ObjectId.'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.parameters['id'] = { description: 'MongoDB Author ObjectId' }
    #swagger.responses[200] = { description: 'Author deleted successfully' }
    #swagger.responses[400] = { description: 'Invalid ID format' }
    #swagger.responses[404] = { description: 'Author not found' }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[401] = { description: 'Authentication required' }
  */
  authorsController.deleteAuthor(req, res, next);
});

module.exports = router;
