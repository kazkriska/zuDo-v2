import React, { useContext, useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import TodoPropertiesForm from './TodoPropertiesForm';
import { TodoDataContext } from '../Column';

const TodoModal = () => {
  const todoData = useContext(TodoDataContext)
  const [visibile, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <div onDoubleClick={(e) => e.stopPropagation()}>
      <button onClick={show}>Edit</button>
      <Rodal visible={visibile} onClose={hide} width={400} height={480}>
        <h3>{todoData.task}</h3>
        <TodoPropertiesForm closeOnSubmit={hide} />
      </Rodal>
    </div>
  );
};

export default TodoModal;
