import React, { createContext } from 'react';
import TodoContainer from './Todo/TodoContainer';
import CreateNewTodo from './Todo/CreateNewTodo';

export const TodoDataContext = createContext();

const Column = ({ category, todos }) => {
  return (
    <div className="column">
      <h4 className="col-heading">{category.toUpperCase()}</h4>
      {todos.map((todo) => (
        <TodoDataContext.Provider key={todo.todo_id} value={todo}>
          <TodoContainer key={todo.todo_id} />
        </TodoDataContext.Provider>
      ))}
      {/* Only display CreateNewTodo when category is not backlog */}
      {category !== 'backlog' ? <CreateNewTodo category={category} /> : null}
    </div>
  );
};

export default Column;
