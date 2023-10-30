import React, { useState } from 'react';
import { createTodo } from '../../utils/todoRequests';
import TodoForm from './TodoForm';

const CreateNewTodo = ({ category }) => {
  const [clicked, setClicked] = useState(false);
  const [input, setInput] = useState('');

  //Handles adding new Todo
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      const todo = {
        task: input,
        category: category,
        created_at: new Date().toISOString(), // ISO is must for backend to work and date parsing
      };
      createTodo(todo);
      setInput('');
      setClicked((state) => !state);
    }
  };
  return (
    <div>
      {/* if clicked is TRUE then show TodoForm else show NewTodoButton  */}
      {clicked ? (
        <TodoForm
          inputValue={input}
          handleChange={(e) => setInput(e.target.value)}
          handleSubmit={handleSubmit}
          formButtonText={'Add'}
        />
      ) : (
        <div
          id="newTodoBtn"
          className="std-box-component dashed-border"
          onDoubleClick={() => setClicked((state) => !state)}
        >
          <p className="text-defaultRegular">+ New</p>
        </div>
      )}
    </div>
  );
};

export default CreateNewTodo;
