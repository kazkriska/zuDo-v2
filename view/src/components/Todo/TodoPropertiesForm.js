import React, { useContext, useState } from 'react';
import { TodoDataContext } from '../Column';
import formatDateToYYYYMMDD from '../../utils/formatDateToYYYYMMDD';
import { updateTodo } from '../../utils/todoRequests';
import TodoPropertiesDisplay from './TodoPropertiesDisplay';

const TodoPropertiesForm = ({ closeOnSubmit }) => {
  const todoData = useContext(TodoDataContext);
  const [todoProperties, setTodoProperties] = useState(todoData);


  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, due_on } = todoProperties;
    updateTodo(todoData.todo_id, { category, due_on });
    closeOnSubmit();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <fieldset style={{ textAlign: 'left' }}>
          <label htmlFor="todoCategory">Category: </label>
          <select
            name="todoCategory"
            id="todoCategory"
            value={todoProperties.category}
            onChange={(e) =>
              setTodoProperties({ ...todoProperties, category: e.target.value })
            }
          >
            <option value="today">Today</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="dumpster">Dumpster</option>
            <option value="backlog">Backlog</option>
          </select>
          <br />
          <br />
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formatDateToYYYYMMDD(todoProperties.due_on)}
            onChange={(e) =>
              setTodoProperties({
                ...todoProperties,
                due_on: new Date(e.target.value).toISOString(), //Converts the date returned from <input> field into an ISO String to send to backend
              })
            }
          />
        </fieldset>
        <br />
        <button type="submit" style={{ alignSelf: 'center' }}>
          Save
        </button>
      </form>
      <TodoPropertiesDisplay />
    </div>
  );
};

export default TodoPropertiesForm;
