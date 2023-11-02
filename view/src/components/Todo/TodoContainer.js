import React, { useContext, useState, useRef } from 'react';
import TodoDisplay from './TodoDisplay';
import { TodoDataContext } from '../Column';
import TodoForm from './TodoForm';
import { updateTodo } from '../../utils/todoRequests';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// This will act as a DRAGGABLE component
const TodoContainer = ({ id }) => {
  const todoData = useContext(TodoDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todoData.task); // holds the state of the input which represents the todo's task value
  const containerRef = useRef(null);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  }); // TODO Check if it works with destructuring also --> { id }

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  // ! uncomment when common ref issue resolved
  // const handleOutsideClick = (e) => {
  //   if (containerRef.current && !containerRef.current.contains(e.target)) {
  //     setIsEditing(false);
  //     setTask(todoData.task);
  //   }
  // };

  // ! uncomment when common ref issue resolved
  // useEffect(() => {
  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  //   // ! Be careful, in future this might behave unexpectedly because of dependency array being empty
  //   // eslint-disable-next-line
  // }, []);

  //handles editing existing todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task !== todoData.task) {
      const trimmedInput = task.trim();
      if (trimmedInput) {
        updateTodo(todoData.todo_id, { task });
        setIsEditing((state) => !state);
      }
    } else {
      alert('No change detected');
      setIsEditing((state) => !state);
      return;
    }
  };

  return (
    // <div ref={containerRef}> // ! old ref property which was used to control outsideClick, figure out a way to integrate with setRefNode
    // TODO check if works without role='button'
    <div>
      {isEditing ? (
        <TodoForm
          handleSubmit={handleSubmit}
          inputValue={task}
          handleChange={(e) => setTask(e.target.value)}
          formButtonText={'Submit'}
        />
      ) : (
        // THIS is our DRAGGABLE
        <div
          ref={setNodeRef}
          style={style}
          className="todo-container solid-border"
        >
          <div className="todo-display">
            <TodoDisplay
              handleDoubleClick={() => setIsEditing((state) => !state)} // <TodoContainer> passes the eventhandler as a prop to TodoDisplay as only Container has the state of isEditing
            />
          </div>
          <div className="drag-handle" role='button' {...listeners} {...attributes}></div>{' '}
          {/* Drag Handle */}
        </div>
      )}
    </div>
  );
};

export default TodoContainer;
