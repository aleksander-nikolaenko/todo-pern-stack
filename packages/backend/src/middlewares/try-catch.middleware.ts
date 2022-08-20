import { Request, Response, NextFunction } from 'express';

type WrapperFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;
const tryCatchWrapper =
  (fn: WrapperFunction) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default tryCatchWrapper;
