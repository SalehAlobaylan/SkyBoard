import React from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handlePriorityChange = (priority) => {
    onUpdate(todo.id, { priority });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
        />
        <div className="todo-details">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <div className="todo-meta">
            <span className="due-date">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </span>
            <select
              value={todo.priority}
              onChange={(e) => handlePriorityChange(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem; 