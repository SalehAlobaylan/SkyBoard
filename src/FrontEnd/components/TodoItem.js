import React from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {


  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
        />
        <div className="todo-details">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <div className="todo-meta">
            <span className="due-date">
            </span>
            <select
              value={todo.priority}
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