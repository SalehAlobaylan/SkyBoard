import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { db } from '../config/firebase';

class User {
  /**
   * Create a new User instance
   * @param {Object} userData User data
   */
  constructor(userData) {
    this.id = userData.id || userData.uid;
    this.displayName = userData.displayName || '';
    this.email = userData.email || '';
    this.photoURL = userData.photoURL || '';
    this.createdAt = userData.createdAt || new Date();
    this.lastLogin = userData.lastLogin || new Date();
    this.settings = userData.settings || {};
  }

  /**
   * Get a user by ID
   * @param {string} userId User ID
   * @returns {Promise<User|null>} User instance or null if not found
   */
  static async getById(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return new User({ id: userDoc.id, ...userDoc.data() });
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  /**
   * Save user to Firestore
   * @returns {Promise<void>}
   */
  async save() {
    try {
      const userData = {
        displayName: this.displayName,
        email: this.email,
        photoURL: this.photoURL,
        lastLogin: new Date(),
        settings: this.settings,
      };

      if (!(await User.getById(this.id))) {
        // New user, include createdAt
        userData.createdAt = new Date();
        await setDoc(doc(db, 'users', this.id), userData);
      } else {
        // Existing user, update
        await updateDoc(doc(db, 'users', this.id), userData);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }
}

export default User;
