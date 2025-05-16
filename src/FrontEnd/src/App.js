import React from 'react';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import './styles/Todo.css';

function App() {
  return (
    <div className="app">
      <ThemeToggle />
      <TodoList />
    </div>
  );
}

export default App; 