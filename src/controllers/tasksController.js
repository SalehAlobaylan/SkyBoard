import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs
} from 'firebase/firestore';

/**
 * Get all tasks for a user
 * @param {string} userId User ID
 * @returns {Promise<Array>} List of tasks
 */
export const getUserTasks = async (userId) => {
  try {
    const tasksQuery = query(
      collection(db, 'tasks'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(tasksQuery);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user tasks:', error);
    throw error;
  }
};

/**
 * Create a new task
 * @param {Object} taskData Task data
 * @returns {Promise<string>} New task ID
 */
export const createTask = async (taskData) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), taskData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

/**
 * Update an existing task
 * @param {string} taskId Task ID
 * @param {Object} taskData Updated task data
 * @returns {Promise<void>}
 */
export const updateTask = async (taskId, taskData) => {
  try {
    await updateDoc(doc(db, 'tasks', taskId), taskData);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

/**
 * Delete a task
 * @param {string} taskId Task ID
 * @returns {Promise<void>}
 */
export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, 'tasks', taskId));
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
