import {
  getAllTodos,
  getTodoById,
  updateTodo,
  createTodo,
  deleteTodo,
} from './todos-controller';
import express from 'express'
  ;
const TodosRoute = express.Router();

TodosRoute.get('/all', getAllTodos);
TodosRoute.get('/:id', getTodoById);
TodosRoute.put('/', updateTodo);
TodosRoute.post('/', createTodo);
TodosRoute.delete('/:id', deleteTodo);

export default TodosRoute;