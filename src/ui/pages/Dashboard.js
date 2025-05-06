import React, { useState, useEffect } from 'react';
import { fetchUserTasks, addTask, editTask, removeTask } from '../../services/taskService';
import TaskCard from '../components/TaskCard';

/**
 * Dashboard page component
 */
const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const userTasks = await fetchUserTasks(user.id);
      setTasks(userTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await addTask({
        ...taskData,
        userId: user.id
      });
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    }
  };

  const handleEditTask = async (taskId, taskData) => {
    try {
      const updatedTask = await editTask(taskId, taskData);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await removeTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  
  return (
    <div className="dashboard">
      <h1>Your Tasks</h1>
      
      {error && <div className="error">{error}</div>}
      
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks found. Add your first task!</p>
        ) : (
          tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={(task) => handleEditTask(task.id, task)} 
              onDelete={handleDeleteTask} 
            />
          ))
        )}
      </div>
      
      {/* Task creation form would go here */}
    </div>
  );
};

export default Dashboard;
