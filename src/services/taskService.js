// This file provides business logic and API calls for task-related operations throughout the application.

// In-memory store for tasks
let tasks = [];
let nextId = 1;

// Default task structure
const defaultTask = {
  title: "",
  description: "",
  dueDate: null,
  priority: "Medium",
  completed: false,
};

async function createTask(taskData) {
  const newTask = {
    ...defaultTask,
    ...taskData,
    id: String(nextId++),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
}

async function getTasks(filters = {}) {
  let filteredTasks = [...tasks];

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm))
    );
  }

  if (filters.priority) {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority === filters.priority
    );
  }

  if (filters.completed !== undefined) {
    const completedBool =
      filters.completed === "true" || filters.completed === true;
    filteredTasks = filteredTasks.filter(
      (task) => task.completed === completedBool
    );
  }
  return filteredTasks;
}

async function getTaskById(id) {
  const task = tasks.find((t) => t.id === id);
  return task; // Returns undefined if not found, handled by controller
}

async function updateTask(id, updates) {
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) {
    return null; // Task not found
  }
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...updates,
    id: tasks[taskIndex].id, // Ensure ID is not overwritten
    createdAt: tasks[taskIndex].createdAt, // Ensure createdAt is not overwritten
    updatedAt: new Date().toISOString(),
  };
  return tasks[taskIndex];
}

async function deleteTask(id) {
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  return tasks.length < initialLength; // Return true if a task was deleted
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
