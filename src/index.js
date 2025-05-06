import React, { useState, useEffect } from 'react';

import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// eslint-disable-next-line import/order
import { initializeAuth } from './services/authService';

// Import pages
import Dashboard from './ui/pages/Dashboard';

// Simple login page component
const LoginPage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>SkyBoard Login</h1>
      <p>Please sign in to continue</p>
      <button onClick={() => console.log('Login clicked')}>Sign in with Google</button>
    </div>
  );
};

// Main App component
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up authentication listener
    const unsubscribe = initializeAuth(user => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
      </Routes>
    </Router>
  );
}

// Render the App
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
