import React, { useEffect, useState } from 'react';
import { fetchAllTodos } from '../utils/todoRequests';
import Column from './Column';
import { DndContext } from '@dnd-kit/core';

import handleDragEnd from '../utils/handleDndDragEnd';

const KanbanBoard = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchAllTodos().then((res) =>
      setTodos(res.sort((a, b) => a.todo_id - b.todo_id))
    ); // the sort always keep the array of todos sorted in ascending order based on their todo_id
  });

  const filterTodos = (todoArr, category) => {
    return todoArr.filter((todo) => todo.category === category);
  };

  // ! <Column>'s below will act as our Droppable Component, MORE INFO -> (https://docs.dndkit.com/introduction/getting-started#pushing-things-a-bit-further), they have been provided key & id as required by documentation

  return (
    <DndContext onDragEnd={handleDragEnd} autoScroll={false} >
      <div className="kanban-board">
        <div className="row-container">
          <Column
            category="today"
            key="todayCol"
            id="todayCol"
            todos={filterTodos(todos, 'today')}
          />
          <Column
            category="backlog"
            key="backlogCol"
            id="backlogCol"
            todos={filterTodos(todos, 'backlog')}
          />
        </div>
        <Column
          category="week"
          key="weekCol"
          id="weekCol"
          todos={filterTodos(todos, 'week')}
        />
        <Column
          category="month"
          key="monthCol"
          id="monthCol"
          todos={filterTodos(todos, 'month')}
        />
        <Column
          category="dumpster"
          key="dumpsterCol"
          id="dumpsterCol"
          todos={filterTodos(todos, 'dumpster')}
        />
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
