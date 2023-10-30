import React, { useEffect, useState } from 'react';
import { fetchAllTodos } from '../utils/todoRequests';
import Column from './Column';

const KanbanBoard = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchAllTodos().then((res) => setTodos(res.sort((a, b) => a.todo_id - b.todo_id))); // the sort always keep the array of todos sorted in ascending order based on their todo_id
  });

  const filterTodos = (todoArr, category) => {
    return todoArr.filter((todo) => todo.category === category)
  }

  return (
    <div className="kanban-board">
      <div className="row-container">
        <Column category='today' todos={filterTodos(todos, 'today')} />
        <Column category='backlog' todos={filterTodos(todos, 'backlog')} />
      </div>
      <Column category='week' todos={filterTodos(todos, 'week')} />
      <Column category='month' todos={filterTodos(todos, 'month')} />
      <Column category='dumpster' todos={filterTodos(todos, 'dumpster')} />
    </div>
  );
};

export default KanbanBoard;
