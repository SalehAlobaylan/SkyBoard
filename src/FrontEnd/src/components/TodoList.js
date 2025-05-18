import React, { useState, useEffect, useCallback } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import TodoFilter from './TodoFilter';
import { useAuth } from '../context/AuthContext';
import '../styles/Todo.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    completed: undefined
  });
  const [error, setError] = useState(null);
  const { currentUser, getToken } = useAuth();

  const fetchTodos = useCallback(async () => {
    try {
      setError(null);
      const queryParams = new URLSearchParams(filters).toString();
      const token = await getToken();
      
      const response = await fetch(`/api/tasks?${queryParams}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'X-User-ID': currentUser ? currentUser.uid : 'user123' // Fallback to mock user for testing
        }
      });
      
      if (response.status === 401) {
        setError('Authentication required. Please log in again.');
        setTodos([]);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load tasks. Please try again later.');
      setTodos([]);
    }
  }, [filters, currentUser, getToken]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (newTodo) => {
    try {
      setError(null);
      const token = await getToken();
      
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          'X-User-ID': currentUser ? currentUser.uid : 'user123' // Fallback to mock user for testing
        },
        body: JSON.stringify(newTodo)
      });
      
      if (response.status === 401) {
        setError('Authentication required. Please log in again.');
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add task. Please try again.');
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      setError(null);
      const token = await getToken();
      
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          'X-User-ID': currentUser ? currentUser.uid : 'user123' // Fallback to mock user for testing
        },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setError(null);
      const token = await getToken();
      
      const response = await fetch(`/api/tasks/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'X-User-ID': currentUser ? currentUser.uid : 'user123' // Fallback to mock user for testing
        }
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete task. Please try again.');
    }
  };

  return (
    <div className="todo-list">
      <h1>SkyBoard</h1>
      {error && <div className="error-message">{error}</div>}
      <AddTodo onAdd={handleAddTodo} />
      <TodoFilter filters={filters} onFilterChange={setFilters} />
      <div className="todos">
        {todos.length === 0 ? (
          <p className="no-todos">No tasks found. Add a new task to get started!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id || `temp-${Date.now()}-${Math.random()}`}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList; 