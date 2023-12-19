import express from 'express';
import {
  signInWithPassword,
  createAccount,
  getLoggedInUser,
  forgotPasswordEmail,
  signOut,
  updateUser
} from './supabase-auth-controller';

const SupabaseAuthRoute = express.Router();

SupabaseAuthRoute.post('/', signInWithPassword);
SupabaseAuthRoute.post('/create', createAccount);
SupabaseAuthRoute.get('/currentUser', getLoggedInUser);
SupabaseAuthRoute.post('/forgotPassword', forgotPasswordEmail);
SupabaseAuthRoute.post('/updateUser', updateUser);
SupabaseAuthRoute.post('/signOut', signOut);

export default SupabaseAuthRoute;