// This file provides business logic and API calls for task-related operations throughout the application.

const { db } = require("../config/firebaseAdmin");
const createError = require("http-errors");
const TASKS_COLLECTION = "tasks";

/**
 * Create a new task in Firestore
 * @param {Object} taskData The task data to create
 * @param {string} userId The ID of the user creating the task
 * @returns {Promise<Object>} The created task with ID
 */
async function createTask(taskData, userId) {
  // Prepare the task object with defaults
  const newTask = {
    completed: false,
    ...taskData,
    userId: userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Remove any undefined values that might have come from validation
  Object.keys(newTask).forEach(
    (key) => newTask[key] === undefined && delete newTask[key]
  );

  try {
    const docRef = await db.collection(TASKS_COLLECTION).add(newTask);
    const docSnapshot = await docRef.get();
    return { id: docRef.id, ...docSnapshot.data() };
  } catch (error) {
    throw createError(500, `Failed to create task: ${error.message}`);
  }
}

/**
 * Get tasks with optional filtering
 * @param {Object} filters Filters to apply (search, priority, completed)
 * @param {string} userId The ID of the user to get tasks for
 * @returns {Promise<Array>} The filtered tasks
 */
async function getTasks(filters = {}, userId) {
  try {
    let query = db.collection(TASKS_COLLECTION);

    // Always filter by userId since we know it exists
    query = query.where("userId", "==", userId);

    // // Apply Firestore filters directly when possible
    // if (filters.priority) {
    //   query = query.where("priority", "==", filters.priority);
    // }

    // if (filters.completed !== undefined) {
    //   const completedBool = String(filters.completed).toLowerCase() === "true";
    //   query = query.where("completed", "==", completedBool);
    // }

    // // Sort by newest first
    // query = query.orderBy("createdAt", "desc");

    const snapshot = await query.get();
    let tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Text search needs to be applied after fetching (Firestore limitation)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      tasks = tasks.filter(
        (task) =>
          (task.title && task.title.toLowerCase().includes(searchTerm)) ||
          (task.description &&
            task.description.toLowerCase().includes(searchTerm))
      );
    }

    return tasks;
  } catch (error) {
    throw createError(500, `Failed to fetch tasks: ${error.message}`);
  }
}

/**
 * Get a task by ID
 * @param {string} id The task ID
 * @param {string} userId The ID of the user to verify task ownership
 * @returns {Promise<Object>} The task
 */
async function getTaskById(id, userId) {
  try {
    const docRef = db.collection(TASKS_COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw createError(404, `Task with ID ${id} not found`);
    }

    const task = { id: doc.id, ...doc.data() };

    // Check if task belongs to authenticated user
    if (task.userId !== userId) {
      throw createError(403, "You don't have permission to access this task");
    }

    return task;
  } catch (error) {
    if (error.status === 404 || error.status === 403) throw error;
    throw createError(500, `Failed to fetch task: ${error.message}`);
  }
}

/**
 * Update a task by ID
 * @param {string} id The task ID
 * @param {Object} updates The updates to apply
 * @param {string} userId The ID of the user to verify task ownership
 * @returns {Promise<Object>} The updated task
 */
async function updateTask(id, updates, userId) {
  try {
    const docRef = db.collection(TASKS_COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw createError(404, `Task with ID ${id} not found`);
    }

    const task = doc.data();

    // Check if task belongs to authenticated user
    if (task.userId !== userId) {
      throw createError(403, "You don't have permission to update this task");
    }

    // Add updatedAt timestamp and protect id, createdAt & userId from overwrite
    const validUpdates = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // Protect these fields from being modified
    delete validUpdates.id;
    delete validUpdates.createdAt;
    delete validUpdates.userId; // Prevent changing ownership

    // Remove any undefined values that might have come from validation
    Object.keys(validUpdates).forEach(
      (key) => validUpdates[key] === undefined && delete validUpdates[key]
    );

    // Check if there are actual updates to apply (other than just updatedAt)
    if (Object.keys(validUpdates).length <= 1) {
      throw createError(400, "No valid fields to update were provided");
    }

    // Apply the updates
    await docRef.update(validUpdates);

    // Fetch and return the updated document
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    if (error.status === 404 || error.status === 403 || error.status === 400)
      throw error;
    throw createError(500, `Failed to update task: ${error.message}`);
  }
}

/**
 * Delete a task by ID
 * @param {string} id The task ID
 * @param {string} userId The ID of the user to verify task ownership
 * @returns {Promise<boolean>} True if deleted
 */
async function deleteTask(id, userId) {
  try {
    const docRef = db.collection(TASKS_COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw createError(404, `Task with ID ${id} not found`);
    }

    const task = doc.data();

    // Check if task belongs to authenticated user
    if (task.userId !== userId) {
      throw createError(403, "You don't have permission to delete this task");
    }

    await docRef.delete();
    return true;
  } catch (error) {
    if (error.status === 404 || error.status === 403) throw error;
    throw createError(500, `Failed to delete task: ${error.message}`);
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
