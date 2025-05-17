import React from 'react';

const TodoFilter = ({ filters, onFilterChange }) => {
  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handlePriorityChange = (e) => {
    onFilterChange({ ...filters, priority: e.target.value });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    onFilterChange({
      ...filters,
      completed: value === 'all' ? undefined : value === 'completed'
    });
  };

  return (
    <div className="todo-filters">
      <input
        type="text"
        value={filters.search}
        onChange={handleSearchChange}
        placeholder="Search todos..."
        className="search-input"
      />
      <select
        value={filters.priority}
        onChange={handlePriorityChange}
        className="filter-select"
      >
        <option value="">All Priorities</option>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <select
        value={filters.completed === undefined ? 'all' : filters.completed ? 'completed' : 'active'}
        onChange={handleStatusChange}
        className="filter-select"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="active">Active</option>
      </select>
    </div>
  );
};

export default TodoFilter; 