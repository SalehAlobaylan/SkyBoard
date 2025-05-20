// This file contains middleware functions for authentication and authorization
const { auth } = require('../config/firebaseAdmin');

/**
 * Middleware to check if the user is authenticated
 */
const requireAuth = (req, res, next) => {
  // For development: Accept X-User-ID header for easier testing
  if (process.env.NODE_ENV === 'development' && req.headers['x-user-id']) {
    req.user = { id: req.headers['x-user-id'] };
    return next();
  }

  // Normal authentication flow
  if (req.isAuthenticated()) {
    return next();
  }

  // Check for token-based authentication
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
    // Verify token (this would be async in production)
    // For development, just accept any token and set a mock user
    if (process.env.NODE_ENV === 'development') {
      req.user = { id: 'user123' };
      return next();
    }
    
    // In production, you'd verify the Firebase token here
    // auth.verifyIdToken(token).then(decodedToken => {...})
  }

  res
    .status(401)
    .json({ message: "Unauthorized: Please login to access this resource" });
};

module.exports = {
  requireAuth,
};
