const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongodb = require('./db/connect');

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'An unexpected error occurred on the server.'
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.error('MongoDB connection error:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server listening on port ${port} and connected to MongoDB`);
    });
  }
});
