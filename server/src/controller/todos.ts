import { Request, Response } from 'express';
import { supabase } from '../index';

export const getAllTodos = async (_: Request, res: Response) => {
  const { data, error } = await supabase
    .from('todos')
    .select('*');

  if (data) {
    res.status(200).send(data);
  } else {
    res.status(+error.code).send(error.message);
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id);

  if (error) {
    res.status(404).send('Todo not found');
    return;
  }

  res.status(200).send({ success: true, data });
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id, title, completed } = req.body;

  if (!id) {
    return res.status(400).send('id is required');
  }

  const { error } = await supabase
    .from('todos')
    .update({
      title,
      completed,
    })
    .eq('id', id);

  if (error) {
    res.status(404).send('Todo not found');
    return;
  }

  res.status(201).send({ success: true });
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;

  const { error } = await supabase
    .from('todos')
    .insert({ title });

  if (error) {
    res.status(400).send(error.message);
    return;
  }

  res.status(201).send({ success: true });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    res.status(404).send('Todo not found');
    return;
  }

  res.status(200).send({ success: true });
};
