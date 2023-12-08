const express = require('express');
const TodosRoute = express.Router();

const {
  getAllTodos,
  getTodoById,
  updateTodo,
  createTodo,
  deleteTodo,
} = require('../controller/todos');

TodosRoute.get('/all', getAllTodos);
TodosRoute.get('/:id', getTodoById);
TodosRoute.put('/', updateTodo);
TodosRoute.post('/', createTodo);
TodosRoute.delete('/:id', deleteTodo);

module.exports = TodosRoute;
