// This file contains controller functions for handling task-related HTTP requests and responses.

const taskService = require("../services/taskService");

/**
 * Create a new task
 * POST /api/tasks
 */
async function createTask(req, res, next) {
  try {
    const task = await taskService.createTask(req.body, req.user.id);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

/**
 * Get all tasks with filters
 * GET /api/tasks
 */
async function getTasks(req, res, next) {
  try {
    // Process query params, removing empty strings
    const filters = {};
    
    if (req.query.search) {
      filters.search = req.query.search;
    }
    
    if (req.query.priority) {
      filters.priority = req.query.priority;
    }
    
    if (req.query.completed !== undefined) {
      filters.completed = req.query.completed;
    }
    
    const tasks = await taskService.getTasks(filters, req.user.id);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

/**
 * Get a task by ID
 * GET /api/tasks/:id
 */
async function getTaskById(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

/**
 * Update a task
 * PATCH /api/tasks/:id
 */
async function updateTask(req, res, next) {
  try {
    const updatedTask = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
}

/**
 * Delete a task
 * DELETE /api/tasks/:id
 */
async function deleteTask(req, res, next) {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);
    res.status(204).end(); // No content to send back
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
