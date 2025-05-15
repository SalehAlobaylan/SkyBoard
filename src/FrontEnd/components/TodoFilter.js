import React from 'react';

const TodoFilter = ({ filters }) => {
  return (
    <div className="todo-filters">

      <select
        value={filters.priority}
      >
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select
        value={filters.completed}
      >
        <option value="">All Tasks</option>
        <option value="false">Active</option>
        <option value="true">Completed</option>
      </select>
    </div>
  );
};

export default TodoFilter; 