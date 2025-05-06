import React from 'react';

/**
 * Task card component for displaying a single task
 */
const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColors = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336',
  };

  return (
    <div className="task-card" style={{ borderLeft: `4px solid ${priorityColors[task.priority]}` }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <div className="task-meta">
        <span className={`status status-${task.status}`}>{task.status}</span>

        {task.dueDate && (
          <span className="due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>

      <div className="task-tags">
        {task.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
