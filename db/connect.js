const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let _client;
let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return callback(new Error('MONGODB_URI environment variable is not defined'));
  }

  MongoClient.connect(uri)
    .then((client) => {
      _client = client;
      _db = client.db();
      // Provide compatibility for getDb().collection() or getDb().db().collection()
      _db.db = () => _db;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized');
  }
  return _db;
};

const closeDb = async () => {
  if (_client) {
    await _client.close();
    _client = null;
    _db = null;
  }
};

module.exports = {
  initDb,
  getDb,
  closeDb
};
