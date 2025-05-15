import React from 'react';

const TodoFilter = ({ filters, onFilterChange }) => {
  return (
    <div className="todo-filters">
      <input
        type="text"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => onFilterChange({...filters, search: e.target.value})}
      />
      <select
        value={filters.priority}
        onChange={(e) => onFilterChange({...filters, priority: e.target.value})}
      >
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select
        value={filters.completed}
        onChange={(e) => onFilterChange({...filters, completed: e.target.value})}
      >
        <option value="">All Tasks</option>
        <option value="false">Active</option>
        <option value="true">Completed</option>
      </select>
    </div>
  );
};

export default TodoFilter; 