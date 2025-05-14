// This file contains controller functions for handling task-related HTTP requests and responses.

const taskService = require("../services/taskService");

async function createTask(req, res, next) {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

async function getTasks(req, res, next) {
  try {
    const tasks = await taskService.getTasks(req.query);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found for update" });
    }
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const wasDeleted = await taskService.deleteTask(req.params.id);
    if (!wasDeleted) {
      return res.status(404).json({ message: "Task not found for deletion" });
    }
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
