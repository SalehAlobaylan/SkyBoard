// This file serves as the application entry point, bootstrapping the React application and any serverless functions.
require('dotenv').config();
const express = require('express');
const { db } = require('./config/firebaseAdmin');
const passport = require('./services/authService.js');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(session({
    secret: 'SecretKey', // unique secret in production!
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if using HTTPS
  }));
app.use(passport.initialize());
app.use(passport.session());

const cors = require("cors");
const tasksRouter = require("./routes/tasksRoutes");
const authRouter = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", tasksRouter);
app.use("/auth", authRouter);

// Catch-all 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app; // Export for potential testing
