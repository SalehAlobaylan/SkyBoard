import React from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handlePriorityChange = (e) => {
    onUpdate(todo.id, { priority: e.target.value });
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
        />
        <span className="todo-title">{todo.title}</span>
        <div className="todo-meta">
          <select
            value={todo.priority}
            onChange={handlePriorityChange}
            className={`priority-${todo.priority}`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <span className={`priority-badge ${todo.priority}`}>
            {todo.priority}
          </span>
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem; 