import { fetchTodoById, updateTodo } from './todoRequests';

const handleDndDragEnd = async (e) => {
  if (e.over) { // Checks if dragged item is over a droppable container, and performs CRUD operations if true 
    const droppedInColName = e.over.id.slice(0, -3);
    const [todoData] = await fetchTodoById(e.active.id);

    if (todoData.category !== droppedInColName) {  // checks if draggable item dropped in same container from which it was picked, aborts updating if same
      updateTodo(todoData.todo_id, { category: droppedInColName });
      return;
    }
  }

  return;
};

export default handleDndDragEnd;
