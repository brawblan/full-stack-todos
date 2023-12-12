// package imports
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from "body-parser";
import { createClient } from '@supabase/supabase-js';

// route imports
import TodosRoute from './routes/todos';

// setup express app
dotenv.config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  // process.env.APP_URL = 'http://localhost:1200';
  process.env.APP_URL = 'http://localhost:5173';
}

// express app packages
app.use(express.json());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      process.env.APP_URL!,
      process.env.API_URL!,
    ],
  })
);

// routes
app.get('/health', (req, res) => res.status(200).send('Health Check'));
app.use('/todos', TodosRoute);

// middleware

// start server
server.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));

// database
export const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || 'supabase-key');
