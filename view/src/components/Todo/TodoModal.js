import React, { useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import TodoPropertiesForm from './TodoPropertiesForm';

const TodoModal = () => {
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
      <Rodal visible={visibile} onClose={hide}>
        <h3>Todo Properties</h3>
        <TodoPropertiesForm closeOnSubmit={hide} />
      </Rodal>
    </div>
  );
};

export default TodoModal;
