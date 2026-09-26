const Validator = require('validatorjs');
const { ObjectId } = require('mongodb');

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const saveBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    isbn: 'required|string',
    publishedYear: 'required|numeric|min:1000',
    genre: 'required|string',
    pageCount: 'required|integer|min:1',
    rating: 'required|numeric|min:0|max:5',
    language: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
};

const saveAuthor = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    bio: 'required|string',
    nationality: 'required|string',
    birthYear: 'required|numeric|min:1000',
    website: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
};

const validateId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format. Must be a 24 character hexadecimal string.'
    });
  }
  next();
};

module.exports = {
  saveBook,
  saveAuthor,
  validateId
};
