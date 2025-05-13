// This file serves as the application entry point, bootstrapping the React application and any serverless functions.
require('dotenv').config(); // Must be first!
const express = require('express');
const { db } = require('./config/firebaseAdmin');
const passport = require('./services/authService.js');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(session({
    secret: 'SecretKey', // unique secret in production!
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if using HTTPS
  }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/test-firestore', async (req, res) => {
  try {
    const docRef = await db.collection('test').add({ timestamp: new Date(), msg: 'Hello Firestore!' });
    res.json({ success: true, docId: docRef.id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Initiate Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('Google OAuth successful!');
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));