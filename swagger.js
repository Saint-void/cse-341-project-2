const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');

dotenv.config();

const doc = {
  info: {
    title: 'Bookstore API',
    description: 'CSE 341 Project 2 - Bookstore REST API documentation with full CRUD for Books (8 fields) and Authors (5 fields).'
  },
  host: process.env.SWAGGER_HOST || 'localhost:8080',
  schemes: ['http', 'https'],
  definitions: {
    Book: {
      _id: '66e8b2f9024f22f7b8849b3a',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0743273565',
      publishedYear: 1925,
      genre: 'Classic Fiction',
      pageCount: 180,
      rating: 4.5,
      language: 'English'
    },
    BookInput: {
      $title: 'The Great Gatsby',
      $author: 'F. Scott Fitzgerald',
      $isbn: '978-0743273565',
      $publishedYear: 1925,
      $genre: 'Classic Fiction',
      $pageCount: 180,
      $rating: 4.5,
      $language: 'English'
    },
    Author: {
      _id: '66e8b2f9024f22f7b8849b3b',
      name: 'F. Scott Fitzgerald',
      bio: 'Francis Scott Key Fitzgerald was an American novelist and short story writer.',
      nationality: 'American',
      birthYear: 1896,
      website: 'https://fscottfitzgerald.org'
    },
    AuthorInput: {
      $name: 'F. Scott Fitzgerald',
      $bio: 'Francis Scott Key Fitzgerald was an American novelist and short story writer.',
      $nationality: 'American',
      $birthYear: 1896,
      $website: 'https://fscottfitzgerald.org'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
