import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.getIdToken) {
          user.getIdToken = async () => {
            try {
              return await auth.currentUser.getIdToken(true);
            } catch (error) {
              console.error('Error getting token:', error);
              return '';
            }
          };
        }
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getToken = async () => {
    if (currentUser && currentUser.getIdToken) {
      try {
        return await currentUser.getIdToken(true);
      } catch (error) {
        console.error('Error getting token:', error);
      }
    }
    return '';
  };

  const value = {
    currentUser,
    logout,
    loading,
    getToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 