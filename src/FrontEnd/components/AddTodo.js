import React, { useState } from 'react';

const AddTodo = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newTodo);
    setNewTodo({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        placeholder="Task title"
        value={newTodo.title}
        onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
        required
      />
      <textarea
        placeholder="Description"
        value={newTodo.description}
        onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
      />
      <input
        type="date"
        value={newTodo.dueDate}
        onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
      />
      <select
        value={newTodo.priority}
        onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTodo; 