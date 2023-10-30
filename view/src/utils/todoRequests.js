export const createTodo = async (data) => {
  const res = await fetch('/api/todo/create', {
    method: 'POST',
    body: JSON.stringify(data), // JSON.stringify() will convert the data which might be an object or array into JSON String, this will then be parsed by bodyParser in the backend into a JS object
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json(); // res.json() will return a promise which resolves into parsed body of the promise its called. .json() parses JSON into JS Object
};

// Gets ALL Todos
export const readTodos = async () => {
  const res = await fetch('/api/todo', {
    method: 'GET',
  });
  return res.json();
};

// Gets UNIQUE (1) Todo
export const readTodo = async (_id) => {
  const res = await fetch(`/api/todo/${_id}`, {
    method: 'GET',
  });
  return res.json();
}

export const updateTodo = async (_id, data) => {
  const res = await fetch(`/api/todo/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

export const deleteTodo = async (_id) => {
  const res = await fetch(`/api/todo/${_id}`, {
    method: 'DELETE',
  });
  return res.json();
};
