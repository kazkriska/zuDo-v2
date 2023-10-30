import React, { useContext } from 'react';
import { TodoDataContext } from '../Column';
import { deleteTodo } from '../../utils/todoRequests';
import TodoModal from './TodoModal';

const TodoDisplay = ({handleDoubleClick}) => {
  const todoData = useContext(TodoDataContext)
  return (
    <div className="std-box-component solid-border" onDoubleClick={handleDoubleClick}>
      <p>{todoData.task}</p>
      <button style={{ marginLeft: 8, marginRight: 4 }} onClick={() => deleteTodo(todoData.todo_id)}> 
        Delete
      </button>
      <TodoModal />
    </div>
  );
};

export default TodoDisplay;
