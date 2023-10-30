CREATE TABLE todo_db(
    todo_id SERIAL PRIMARY KEY,
    task VARCHAR(30) NOT NULL, 
    category VARCHAR(30) NOT NULL, 
    created_at TIMESTAMPTZ,
  	expires_at TIMESTAMPTZ
);

-- INSERT INTO todo_db (task, category) VALUES ($1, $2)

-- SELECT * FROM todo_db WHERE task_id = 3

-- UPDATE todo_db SET task = $1, category = $2, created_at = $3 WHERE task_id = $4

-- DELETE FROM todo_db WHERE task_id = $1
