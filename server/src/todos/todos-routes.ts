import express from 'express';
import {
  getAllTodos,
  getTodoById,
  updateTodo,
  createTodo,
  deleteTodo,
} from './todos-controller';

const TodosRoute = express.Router();

TodosRoute.get('/all', getAllTodos);
TodosRoute.get('/:id', getTodoById);
TodosRoute.put('/', updateTodo);
TodosRoute.post('/', createTodo);
TodosRoute.delete('/:id', deleteTodo);

export default TodosRoute;
