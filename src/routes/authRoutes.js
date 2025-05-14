const express = require("express");
const router = express.Router();
const passport = require("passport");
const { db } = require("../config/firebaseAdmin");
const { 
  isAuthenticated, 
  handleOAuthCallback, 
  logoutUser 
} = require("../controllers/authController");

// Test Firestore connection
router.get('/test-firestore', async (req, res) => {
  try {
    const docRef = await db.collection('test').add({ timestamp: new Date(), msg: 'Hello Firestore!' });
    res.json({ success: true, docId: docRef.id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Initiate Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  handleOAuthCallback
);

// Check authentication status
router.get('/status', isAuthenticated);

// Logout route
router.get('/logout', logoutUser);

module.exports = router;
  