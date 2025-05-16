// This file defines the Task data model and provides methods for interacting with task data in Firestore.

/**
 * Task object structure in the Firestore database
 * @typedef {Object} Task
 * @property {string} id - The unique identifier of the task (document ID in Firestore)
 * @property {string} title - The title of the task
 * @property {string} [description] - Optional description of the task
 * @property {string} [dueDate] - Optional due date in ISO 8601 format (e.g., "2023-12-31T23:59:59Z")
 * @property {('High'|'Medium'|'Low')} priority - The priority level of the task
 * @property {boolean} completed - Whether the task is completed (default: false)
 * @property {string} [userId] - The ID of the user who owns this task (for auth integration)
 * @property {string} createdAt - Timestamp when the task was created (ISO 8601 format)
 * @property {string} updatedAt - Timestamp when the task was last updated (ISO 8601 format)
 */

/**
 * TaskFilters object structure for filtering tasks
 * @typedef {Object} TaskFilters
 * @property {string} [search] - Optional search term to filter tasks by title or description
 * @property {('High'|'Medium'|'Low')} [priority] - Optional priority to filter tasks by
 * @property {boolean|string} [completed] - Optional completion status to filter tasks by
 */

/**
 * Map of valid field names to their expected types in the database
 * This helps enforce data consistency
 * @type {Object.<string, string>}
 */
const TaskFields = {
  title: "string",
  description: "string",
  dueDate: "string", // ISO 8601 date string
  priority: "string", // 'High', 'Medium', or 'Low'
  completed: "boolean",
  userId: "string",
  createdAt: "string", // ISO 8601 timestamp
  updatedAt: "string", // ISO 8601 timestamp
};

module.exports = {
  TaskFields,
};
