const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/books', require('./books'));
router.use('/authors', require('./authors'));

router.get('/', (req, res) => {
  res.send('Welcome to Bookstore API! Access Swagger documentation at <a href="/api-docs">/api-docs</a>');
});

module.exports = router;
