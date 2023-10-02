import { NextFunction, Request, Response } from 'express';
import joi, { ObjectSchema } from 'joi';
import HttpException from '../exceptions/http.exception';

type RequestPart = 'body' | 'params' | 'query' | undefined;

const validation =
  (schema: ObjectSchema = joi.object({}), reqPart: RequestPart = 'body') =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[reqPart]);

    if (error) {
      next(new HttpException(400, error.message));
    }

    next();
  };

export default validation;
