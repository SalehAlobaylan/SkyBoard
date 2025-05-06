import { signInWithGoogle, signOut, subscribeToAuthChanges } from '../controllers/authController';
import User from '../models/User';

/**
 * Handle user login with Google
 * @returns {Promise<Object>} User data
 */
export const login = async () => {
  try {
    const userData = await signInWithGoogle();

    // Create or update user in Firestore
    const user = new User({
      id: userData.uid,
      displayName: userData.displayName,
      email: userData.email,
      photoURL: userData.photoURL,
    });

    await user.save();
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Handle user logout
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Set up authentication state listener
 * @param {Function} onAuthStateChange Callback function for auth state changes
 * @returns {Function} Unsubscribe function
 */
export const initializeAuth = onAuthStateChange => {
  return subscribeToAuthChanges(async user => {
    if (user) {
      // User is signed in
      const userModel =
        (await User.getById(user.uid)) ||
        new User({
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

      if (!(await User.getById(user.uid))) {
        await userModel.save();
      }

      onAuthStateChange(userModel);
    } else {
      // User is signed out
      onAuthStateChange(null);
    }
  });
};
