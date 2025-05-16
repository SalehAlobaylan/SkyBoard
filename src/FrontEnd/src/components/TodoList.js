import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import TodoFilter from './TodoFilter';
import '../styles/Todo.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    completed: undefined
  });

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  const fetchTodos = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/tasks?${queryParams}`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
      });
      const data = await response.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-list">
      <h1>SkyBoard</h1>
      <AddTodo onAdd={handleAddTodo} />
      <TodoFilter filters={filters} onFilterChange={setFilters} />
      <div className="todos">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList; 