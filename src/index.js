// This file serves as the application entry point
require('dotenv').config();

// Set NODE_ENV to development by default if not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Import required packages
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { db } = require('./config/firebaseAdmin');
const passport = require('./services/authService.js');

// Import routes
const tasksRouter = require("./routes/tasksRoutes");
const authRouter = require("./routes/authRoutes");

// Initialize express app
const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Use environment variable in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if using HTTPS

}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api/tasks", tasksRouter);
app.use("/api/auth", authRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Catch-all 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({ 
        message: "Not Found",
        path: req.path
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = process.env.NODE_ENV === 'production' 
        ? 'Something went wrong!' 
        : err.message;
    
    res.status(status).json({ 
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; // Export for potential testing
