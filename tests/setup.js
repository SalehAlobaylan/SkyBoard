// Jest setup file
import '@testing-library/jest-dom';

// Mock Firebase
jest.mock('../src/config/firebase', () => {
  return {
    db: {},
    auth: {
      currentUser: null,
      onAuthStateChanged: jest.fn()
    },
    googleProvider: {}
  };
});

// Global test setup
beforeAll(() => {
  // Setup code that runs before all tests
});

afterAll(() => {
  // Cleanup code that runs after all tests
});
