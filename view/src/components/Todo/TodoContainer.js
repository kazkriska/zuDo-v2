import React, { useContext, useState } from 'react';
import TodoDisplay from './TodoDisplay';
import { TodoDataContext } from '../Column';
import TodoForm from './TodoForm';
import { updateTodo } from '../../utils/todoRequests';

const TodoContainer = () => {
  const todoData = useContext(TodoDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todoData.task); // holds the state of the input which represents the todo's task value

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
        alert('No change detected')
        setIsEditing((state) => !state);
        return
    }
  };

  return (
    <div>
      {isEditing ? (
        <TodoForm
          handleSubmit={handleSubmit}
          inputValue={task}
          handleChange={(e) => setTask(e.target.value)}
          formButtonText={'Submit'}
        />
      ) : (
        <TodoDisplay
          handleDoubleClick={() => setIsEditing((state) => !state)} // <TodoContainer> passes the eventhandler as a prop to TodoDisplay as only Container has the state of isEditing
        />
      )}
    </div>
  );
};

export default TodoContainer;
