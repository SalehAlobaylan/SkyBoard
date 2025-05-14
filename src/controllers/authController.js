// This file contains controller functions for handling authentication-related HTTP requests and responses.
const { auth, db } = require('../config/firebaseAdmin');

// Check if user is authenticated
const isAuthenticated = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      authenticated: true, 
      user: req.user 
    });
  } else {
    res.json({ authenticated: false });
  }
};

// Handle successful OAuth callback
const handleOAuthCallback = (req, res) => {
  // Save user to Firestore if needed
  saveUserToFirestore(req.user)
    .then(() => {
      res.redirect('/dashboard');
    })
    .catch(error => {
      console.error('Error saving user:', error);
      res.redirect('/dashboard');
    });
};

// Logout user
const logoutUser = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};

// Helper function to save user to Firestore
const saveUserToFirestore = async (profile) => {
  try {
    // First check if user already exists
    const userRef = db.collection('users').doc(profile.id);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      // Create new user document
      await userRef.set({
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photoURL: profile.photos?.[0]?.value || null,
        createdAt: new Date(),
        lastLogin: new Date()
      });
    } else {
      // Update last login
      await userRef.update({
        lastLogin: new Date()
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
    throw error;
  }
};

module.exports = {
  isAuthenticated,
  handleOAuthCallback,
  logoutUser
};

