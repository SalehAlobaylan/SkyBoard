// This file implements authentication business logic and handles interactions with Firebase Auth and other identity providers.
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// It's best to use an absolute URL for callbackURL
const callbackURL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/google/callback';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: callbackURL
}, (accessToken, refreshToken, profile, done) => {
  // Here create the user in Firestore
  done(null, profile);
}));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  

module.exports = passport;
