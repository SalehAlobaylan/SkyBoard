import React from 'react';

import { login } from '../../services/authService';

const LoginPage = () => {
  const handleLogin = async () => {
    try {
      await login();
      // Redirect will happen automatically via the Router
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to SkyBoard</h1>
        <p>A modern task management application</p>
        <button className="login-button" onClick={handleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
