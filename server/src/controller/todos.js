const db = require('../../db.json');

exports.getAllTodos = (req, res) => {
  res.status(200).send(db);
};

exports.getTodoById = (req, res) => {
  const { id } = req.params;
  const todo = db.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).send('Todo not found');
  }

  res.status(200).send(todo);
};

exports.updateTodo = (req, res) => {
  const { body } = req;

  if (!body.title) {
    return res.status(400).send('Title is required');
  }

  const newTodo = {
    id: Date.now().toString(),
    title: body.title,
    completed: false,
  };

  db.push(newTodo);
  console.log(db);
  res.status(201).send(newTodo);
};

exports.createTodo = (req, res) => {
  const { id, title, completed } = req.body;
  const todo = db.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).send('Todo not found');
  }

  todo.title = title || todo.title;
  todo.completed = completed || false;

  res.status(200).send(todo);
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const todo = db.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).send('Todo not found');
  }

  const index = db.indexOf(todo);
  db.splice(index, 1);

  res.status(200).send(todo);
};
