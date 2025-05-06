import { getUserTasks, createTask, updateTask, deleteTask } from '../controllers/tasksController';
import Task from '../models/Task';

/**
 * Get all tasks for the current user
 * @param {string} userId User ID
 * @returns {Promise<Array>} List of Task objects
 */
export const fetchUserTasks = async (userId) => {
  try {
    const tasksData = await getUserTasks(userId);
    return tasksData.map(task => new Task(task));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

/**
 * Create a new task
 * @param {Object} taskData Task data
 * @returns {Promise<Task>} Created task
 */
export const addTask = async (taskData) => {
  try {
    const task = new Task(taskData);
    await task.save();
    return task;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

/**
 * Update an existing task
 * @param {string} taskId Task ID
 * @param {Object} taskData Task data
 * @returns {Promise<Task>} Updated task
 */
export const editTask = async (taskId, taskData) => {
  try {
    const task = await Task.getById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    
    // Update task properties
    Object.keys(taskData).forEach(key => {
      if (key !== 'id') {
        task[key] = taskData[key];
      }
    });
    
    await task.save();
    return task;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

/**
 * Remove a task
 * @param {string} taskId Task ID
 * @returns {Promise<void>}
 */
export const removeTask = async (taskId) => {
  try {
    const task = await Task.getById(taskId);
    if (task) {
      await task.delete();
    }
  } catch (error) {
    console.error('Error removing task:', error);
    throw error;
  }
};
