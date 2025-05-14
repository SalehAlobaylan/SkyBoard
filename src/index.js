// This file serves as the application entry point, bootstrapping the React application and any serverless functions.

const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasksRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", tasksRouter);

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
