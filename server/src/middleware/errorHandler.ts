import { Request, Response, NextFunction } from 'express';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(500).send({ error: { message: error.message } });
  }

  next();
};

export default errorHandler;
