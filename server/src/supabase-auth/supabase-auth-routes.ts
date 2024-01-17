import express from 'express';
import {
  signInWithPassword,
  createAccount,
  getLoggedInUser,
  forgotPasswordEmail,
  signOut,
  updateUser,
  signInWithGoogle,
  handleAuthData
} from './supabase-auth-controller';

const SupabaseAuthRoute = express.Router();

SupabaseAuthRoute.post('/login', signInWithPassword);
SupabaseAuthRoute.post('/googleLogin', signInWithGoogle);
SupabaseAuthRoute.post('/authData', handleAuthData);
SupabaseAuthRoute.post('/createAccount', createAccount);
SupabaseAuthRoute.get('/currentUser', getLoggedInUser);
SupabaseAuthRoute.post('/forgotPassword', forgotPasswordEmail);
SupabaseAuthRoute.post('/updateUser', updateUser);
SupabaseAuthRoute.post('/signOut', signOut);

export default SupabaseAuthRoute;