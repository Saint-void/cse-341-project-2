const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || `http://localhost:${port}/auth/github/callback`
  }, (accessToken, refreshToken, profile, done) => {
    done(null, {
      id: profile.id,
      username: profile.username,
      displayName: profile.displayName
    });
  }));
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: 'bookstore.sid',
  secret: process.env.SESSION_SECRET || require('crypto').randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  }
}));
app.use(passport.initialize());
app.use(passport.session());

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
