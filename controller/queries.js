const pool = require('../model/database');

exports.create = async (req, res) => {
  const { task, category } = req.body;
  let queryString = 'INSERT INTO todo_db (task, category) VALUES ($1, $2)';
  let queryValues = [task, category];
  try {
    const queryResult = await pool.query(queryString, queryValues);
    return res.status(201).json(`New Task: ${task} `); // sending the queryResult back to the client in JSON format
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.readAll = async (req, res) => {
  let queryString = 'SELECT * FROM todo_db';
  let queryValues = [];
  try {
    const queryResult = await pool.query(queryString, queryValues);
    return res.status(200).json(queryResult.rows);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.readUnique = async (req, res) => {
  const id = Number(req.params.id);
  let queryString = 'SELECT * FROM todo_db WHERE todo_id = $1';
  let queryValues = [id];
  try {
    const queryResult = await pool.query(queryString, queryValues);
    return res.status(200).json(queryResult.rows);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.update = async (req, res) => {
  const id = Number(req.params.id);
  let queryString = `UPDATE todo_db SET ${dynamicQuery(req.body)} WHERE todo_id = $1`;
  let queryValues = [id].concat(Object.values(req.body));
  console.log(queryValues)
  console.log(queryString)
  try {
    const queryResult = await pool.query(queryString, queryValues);
    return res.status(200).json(`Task with ID: ${id}, updated`);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  let queryString = 'DELETE FROM todo_db WHERE todo_id = $1';
  let queryValues = [id];
  try {
    const queryResult = await pool.query(queryString, queryValues);
    return res.status(200).json(`Task with ID: ${id}, deleted`);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// takes in an object, in this case key/value pairs of our todo object and then returns a string for querying, NOTE the function ADDS 2, so the todo_id can always be $1 in a query
const dynamicQuery = (obj) => {
  return Object.keys(obj).map((item, index) => `${item} = $${index+2}`).join(', ')
}