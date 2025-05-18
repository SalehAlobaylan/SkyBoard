import React from 'react';

const TodoFilter = ({ filters, onFilterChange }) => {
  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handlePriorityChange = (e) => {
    onFilterChange({ ...filters, priority: e.target.value || undefined });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    // Convert string values to appropriate boolean or undefined
    let completed;
    if (value === 'all') {
      completed = undefined;
    } else if (value === 'completed') {
      completed = true;
    } else if (value === 'active') {
      completed = false;
    }
    onFilterChange({ ...filters, completed });
  };

  // Determine current completion status value for select
  const getCompletionStatus = () => {
    if (filters.completed === undefined) return 'all';
    return filters.completed ? 'completed' : 'active';
  };

  return (
    <div className="todo-filters">
      <input
        type="text"
        value={filters.search || ''}
        onChange={handleSearchChange}
        placeholder="Search todos..."
        className="search-input"
      />
      <select
        value={filters.priority || ''}
        onChange={handlePriorityChange}
        className="filter-select"
      >
        <option value="">All Priorities</option>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      <select
        value={getCompletionStatus()}
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