const express = require("express");
const { body, query, param, validationResult } = require("express-validator");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

const router = express.Router();

// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

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
      .isIn(["High", "Medium", "Low"])
      .withMessage("Priority must be one of High, Medium, or Low."),
    query("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be a boolean."),
  ],
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
