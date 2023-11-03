import React, { useEffect, useState } from 'react';
import { fetchAllTodos } from '../utils/todoRequests';
import Column from './Column';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

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

  // TODO Can maybe add a state to keep todo data of todoItem being dragged to dynamicall render on overlay, then onStart setdata with async operation and on end set to null

  return (
    <DndContext
      onDragEnd={(e) => handleDragEnd(e)}
      autoScroll={false}
      modifiers={[restrictToWindowEdges]}
    >
      {/* might have to change back to restrictToWindowEdges, as this makes UI/UX weird, REMOVE style.css -> .kanban overflow || restrictToFirstScrollableAncestor */}
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
      <DragOverlay dropAnimation={null}>
        <div className="drag-overlay"></div>
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
