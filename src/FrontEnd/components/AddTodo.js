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
        value={newTodo.title}
      />
      <input
        type="date"
        value={newTodo.dueDate}
      />
      <select
        value={newTodo.priority}
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