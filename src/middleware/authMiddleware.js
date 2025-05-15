// This file contains middleware functions for authentication and authorization

/**
 * Middleware to check if the user is authenticated
 */
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .json({ message: "Unauthorized: Please login to access this resource" });
};

module.exports = {
  requireAuth,
};
