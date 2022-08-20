import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http.exception';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: HttpException, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).json({ status, message });
};

export default errorHandler;
