import React, { createContext } from 'react';
import TodoContainer from './Todo/TodoContainer';
import CreateNewTodo from './Todo/CreateNewTodo';
import { useDroppable } from '@dnd-kit/core';

export const TodoDataContext = createContext();

// This will act as a DROPPABLE component
const Column = ({ category, todos, id }) => {
  const { isOver, setNodeRef } = useDroppable({ id: id }); // TODO Check if it works with destructuring also --> { id }
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div className="column" ref={setNodeRef} style={style}>
      <h4 className="col-heading">{category.toUpperCase()}</h4>
      {todos.map((todo) => (
        <TodoDataContext.Provider key={todo.todo_id} value={todo}>
          {/* This is the DRAGGABLE item */}
          <TodoContainer key={todo.todo_id} id={todo.todo_id} /> {/* MIGHT WANNA PUT setNodeRef here to make everything a droppable too*/}
        </TodoDataContext.Provider>
      ))}
      {/* Only display CreateNewTodo when category is not backlog */}
      {category !== 'backlog' ? <CreateNewTodo category={category} /> : null}
    </div>
  );
};

export default Column;
