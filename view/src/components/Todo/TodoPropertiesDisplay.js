import React, { useContext } from 'react';
import { TodoDataContext } from '../Column';

const TodoPropertiesDisplay = () => {
  let todoData = useContext(TodoDataContext);

  // Converts the created_at & due_on date to Locale String + sets default value of due_on incase not provided
  todoData = {
    ...todoData,
    created_at: new Date(todoData.created_at).toLocaleString(),
    due_on: !todoData.due_on ? 'Not Specified' : new Date(todoData.due_on).toLocaleDateString(),   // PREVIOUSLY: .toLocaleString(), changed so the UI doesnt render a random time as our input only stores date not time // ! can be changed later when adding extra features
  };

  return (
    <fieldset style={{ textAlign: 'left', marginTop: 24 }}>
      {Object.keys(todoData).map((item) => (
        <p key={item}>
          <b>{item}</b>: {todoData[item]}
        </p>
      ))}
    </fieldset>
  );
};

export default TodoPropertiesDisplay;
