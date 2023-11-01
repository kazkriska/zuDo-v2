import React, { useEffect, useState } from 'react';
import { fetchAllTodos } from '../utils/todoRequests';
import Column from './Column';
import { DndContext } from '@dnd-kit/core';
import { restrictToWindowEdges} from '@dnd-kit/modifiers'

import updateTodoOnDragEnd from '../utils/handleDndDragEnd';

const KanbanBoard = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [isDragging, setIsDragging] = useState(false);


  useEffect(() => {
    fetchAllTodos().then((res) =>
      setTodos(res.sort((a, b) => a.todo_id - b.todo_id))
    ); // the sort always keep the array of todos sorted in ascending order based on their todo_id
  });

  const filterTodos = (todoArr, category) => {
    return todoArr.filter((todo) => todo.category === category);
  };

  const handleDragEnd = (e) => {
    updateTodoOnDragEnd(e);
    setIsDragging(false);
  }

  const handleDragStart = () => {
    setIsDragging(true);
  }

  // ! <Column>'s below will act as our Droppable Component, MORE INFO -> (https://docs.dndkit.com/introduction/getting-started#pushing-things-a-bit-further), they have been provided key & id as required by documentation

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} autoScroll={false} modifiers={[restrictToWindowEdges]} > {/* might have to change back to restrictToWindowEdges, as this makes UI/UX weird, REMOVE style.css -> .kanban overflow || restrictToFirstScrollableAncestor */}
      <div className="kanban-board">
        <div className="row-container">
          <Column
            category="today"
            key="todayCol"
            id="todayCol"
            todos={filterTodos(todos, 'today')}
            isDragging={isDragging}
            />
          <Column
            category="backlog"
            key="backlogCol"
            id="backlogCol"
            todos={filterTodos(todos, 'backlog')}
            isDragging={isDragging}
            />
        </div>
        <Column
          category="week"
          key="weekCol"
          id="weekCol"
          todos={filterTodos(todos, 'week')}
          isDragging={isDragging}
          />
        <Column
          category="month"
          key="monthCol"
          id="monthCol"
          todos={filterTodos(todos, 'month')}
          isDragging={isDragging}
          />
        <Column
          category="dumpster"
          key="dumpsterCol"
          id="dumpsterCol"
          todos={filterTodos(todos, 'dumpster')}
          isDragging={isDragging}
        />
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
