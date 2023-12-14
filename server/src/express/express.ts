// package imports
import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';

// route imports
import TodosRoute from '../todos/todos-routes';
import errorHandler from '../middleware/errorHandler';

const createExpressServer = () => {
  // setup express app
  const app = express();
  const server = http.createServer(app);
  const port = process.env.PORT || 3000;

  if (process.env.NODE_ENV === 'development') {
    process.env.APP_URL = 'http://localhost:5173';
    process.env.API_URL = 'http://localhost:1200';
  }

  // middleware
  app.use(errorHandler);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: [
        process.env.APP_URL!,
        process.env.API_URL!,
      ],
    })
  );

  // routes
  app.get('/health', (_, res) => res.status(200).send('Health Check'));
  app.use('/todos', TodosRoute);

  // start server
  return server.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));
};

export default createExpressServer;
