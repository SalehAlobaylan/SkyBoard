import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import TodoFilter from './TodoFilter';

const TodoList = () => {

  return (
    <div className="todo-list">
      <h1>My Todo List</h1>
      <AddTodo/>
      <TodoFilter/>
      <div className="todos">

          <TodoItem/>

      </div>
    </div>
  );
};

export default TodoList; 