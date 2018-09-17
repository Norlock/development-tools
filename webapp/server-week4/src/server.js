const bodyParser = require('body-parser');
const express = require('express');
const TodoList = require('./todo.js');
const app = express();

// Setup the body parser
app.use(bodyParser.json());

// Data store (in memory)
let todoList = new TodoList();

/**
 * REST routings for the ToDo list
 */
app.get('/api/todo', function(req, res) {
  res.status(200);
  res.json(todoList.getList());
});

app.post('/api/todo/:todoItem', function(req, res) {
  try {
    todoList.add(req.params.todoItem);
    res.status(201);
    res.end();
  } catch (err) {
    res.status(400);
    res.end();
  }
});

app.delete('/api/todo/:todoItem', function(req, res) {
  try {
    todoList.delete(req.params.todoItem);
    res.status(204);
    res.end();
  } catch (err) {
    res.status(404);
    res.end();
  }
});

module.exports = app;
