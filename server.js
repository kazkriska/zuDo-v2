const express = require('express');
const todoRouterMiddleware = require('./routes/todoRouter');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use('/api', bodyParser.json());
app.use('/api', todoRouterMiddleware);

app.get('/api/test', (req, res) => {
  console.log(req.body);
  res.json('Bitch Iam Listening');
});

app.listen(port, () => {
  console.log('Listening');
});
