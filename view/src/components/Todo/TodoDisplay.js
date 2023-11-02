import React, { useContext } from 'react';
import { TodoDataContext } from '../Column';
import { deleteTodo } from '../../utils/todoRequests';
import TodoModal from './TodoModal';
import { useDndContext } from '@dnd-kit/core';

const TodoDisplay = ({ handleDoubleClick }) => {
  const dndContext = useDndContext();
  const todoData = useContext(TodoDataContext);
  let isBeingDragged = false;

  if (dndContext.active && dndContext.active.id === todoData.todo_id) {
    isBeingDragged = true;
  }

  return (
    // <div className="std-box-component solid-border" onDoubleClick={handleDoubleClick}> // ! Moving box css properties into TodoContainer for better UI
    <div
      className="std-box-component-without-bottom-margin"
      onDoubleClick={handleDoubleClick}
    >
      <p>{todoData.task}</p>
      {!isBeingDragged ? (
        <>
          <button
            style={{ marginLeft: 8, marginRight: 4 }}
            onClick={() => deleteTodo(todoData.todo_id)}
          >
            Delete
          </button>
          <TodoModal />
        </>
      ) : null}
    </div>
  );
};

export default TodoDisplay;
