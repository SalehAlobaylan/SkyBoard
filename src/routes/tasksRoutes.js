const express = require("express");
const { body, query, param, validationResult } = require("express-validator");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Helper to convert string to boolean
const convertToBoolean = (value) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    const normalized = value.toLowerCase().trim();
    if (normalized === 'true' || normalized === '1' || normalized === 'yes') {
      return true;
    }
    if (normalized === 'false' || normalized === '0' || normalized === 'no') {
      return false;
    }
  }
  return undefined;
};

// Apply authentication middleware to all task routes
router.use(requireAuth);

// POST /api/tasks
router.post(
  "/",
  [
    body("title")
      .isString()
      .notEmpty()
      .withMessage("Title is required and must be a string."),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string."),
    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("dueDate must be a valid ISO 8601 date."),
    body("priority")
      .isIn(["High", "Medium", "Low"])
      .withMessage("Priority must be one of High, Medium, or Low."),
    body("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be a boolean."),
  ],
  handleValidationErrors,
  createTask
);

// GET /api/tasks?search=&priority=&completed=
router.get(
  "/",
  [
    query("search").optional().isString(),
    query("priority")
      .optional()
      .isIn(["High", "Medium", "Low", ""])
      .withMessage("Priority must be one of High, Medium, or Low."),
    query("completed")
      .optional()
      .custom((value) => {
        // Allow undefined, empty string, or valid boolean strings
        if (value === undefined || value === '') {
          return true;
        }
        const boolValue = convertToBoolean(value);
        if (boolValue === undefined && value !== undefined) {
          throw new Error("Completed must be a boolean value (true/false)");
        }
        return true;
      }),
  ],
  (req, res, next) => {
    // Convert completed to proper boolean if present
    if (req.query.completed !== undefined) {
      req.query.completed = convertToBoolean(req.query.completed);
    }
    next();
  },
  handleValidationErrors,
  getTasks
);

// GET /api/tasks/:id
router.get(
  "/:id",
  [param("id").isString().withMessage("Task ID must be a string.")],
  handleValidationErrors,
  getTaskById
);

// PATCH /api/tasks/:id
router.patch(
  "/:id",
  [
    param("id").isString().withMessage("Task ID must be a string."),
    body("title")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Title must be a non-empty string."),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string."),
    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("dueDate must be a valid ISO 8601 date."),
    body("priority")
      .optional()
      .isIn(["High", "Medium", "Low"])
      .withMessage("Priority must be one of High, Medium, or Low."),
    body("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be a boolean."),
  ],
  handleValidationErrors,
  updateTask
);

// DELETE /api/tasks/:id
router.delete(
  "/:id",
  [param("id").isString().withMessage("Task ID must be a string.")],
  handleValidationErrors,
  deleteTask
);

module.exports = router;
