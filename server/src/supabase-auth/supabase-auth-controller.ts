import { Request, Response } from 'express';
import { supabase } from '../services/supabase';

interface SupabaseAuthRequest extends Request {
  body: {
    email: string;
    password: string;
    data?: any;
  };
}

export const signInWithPassword = async (req: SupabaseAuthRequest, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: { message: 'email and password are required' } });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).send({ error });
  }

  return res.status(200).send({ data });
};

export const createAccount = async (req: SupabaseAuthRequest, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: { message: 'email and password are required' } });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).send({ error });
  }

  return res.status(200).send({ data });
};

export const getLoggedInUser = async (_: Request, res: Response) => {
  const { data: { user } } = await supabase.auth.getUser();

  return res.status(200).send({ user });
};

export const forgotPasswordEmail = async (req: SupabaseAuthRequest, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ error: { message: 'email is required' } });
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return res.status(400).send({ error });
  }

  return res.status(200).send({ data });
};

export const updateUser = async (req: SupabaseAuthRequest, res: Response) => {
  const { email, password, data } = req.body;

  const payload = {};

  if (email) {
    Object.assign(payload, { email });
  }
  if (password) {
    Object.assign(payload, { password });
  }
  if (data) {
    Object.assign(payload, { data });
  }

  const { data: returnData, error } = await supabase.auth.updateUser(payload);

  if (error) {
    return res.status(400).send({ error });
  }

  return res.status(200).send({ data: returnData });
};

export const signOut = async (_: Request, res: Response) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(400).send({ error });
  }

  return res.status(200).send({ success: true });
};