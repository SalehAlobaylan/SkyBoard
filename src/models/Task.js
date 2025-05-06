import { db } from '../config/firebase';
import { doc, getDoc, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

class Task {
  /**
   * Create a new Task instance
   * @param {Object} taskData Task data
   */
  constructor(taskData) {
    this.id = taskData.id || null;
    this.title = taskData.title || '';
    this.description = taskData.description || '';
    this.status = taskData.status || 'pending'; // pending, in-progress, completed
    this.priority = taskData.priority || 'medium'; // low, medium, high
    this.userId = taskData.userId || '';
    this.createdAt = taskData.createdAt || new Date();
    this.updatedAt = taskData.updatedAt || new Date();
    this.dueDate = taskData.dueDate || null;
    this.tags = taskData.tags || [];
  }

  /**
   * Get a task by ID
   * @param {string} taskId Task ID
   * @returns {Promise<Task|null>} Task instance or null if not found
   */
  static async getById(taskId) {
    try {
      const taskDoc = await getDoc(doc(db, 'tasks', taskId));
      if (taskDoc.exists()) {
        return new Task({ id: taskDoc.id, ...taskDoc.data() });
      }
      return null;
    } catch (error) {
      console.error('Error getting task:', error);
      throw error;
    }
  }

  /**
   * Save task to Firestore
   * @returns {Promise<string>} Task ID
   */
  async save() {
    try {
      const taskData = {
        title: this.title,
        description: this.description,
        status: this.status,
        priority: this.priority,
        userId: this.userId,
        updatedAt: new Date(),
        dueDate: this.dueDate,
        tags: this.tags,
      };

      if (this.id) {
        // Update existing task
        await updateDoc(doc(db, 'tasks', this.id), taskData);
        return this.id;
      } else {
        // Create new task
        taskData.createdAt = new Date();
        const docRef = await addDoc(collection(db, 'tasks'), taskData);
        this.id = docRef.id;
        return docRef.id;
      }
    } catch (error) {
      console.error('Error saving task:', error);
      throw error;
    }
  }

  /**
   * Delete the task
   * @returns {Promise<void>}
   */
  async delete() {
    if (!this.id) {
      throw new Error('Cannot delete task without ID');
    }
    
    try {
      await deleteDoc(doc(db, 'tasks', this.id));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

export default Task;
