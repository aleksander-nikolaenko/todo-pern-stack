import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../entities/user.entity';
import HttpException from '../exceptions/http.exception';

const auth =
  ({ omit }: { omit: boolean }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
        if (err) {
          throw new HttpException(400, err.message);
        }

        if (!omit && !user) {
          throw new HttpException(401, 'Not authorized');
        }

        req.user = { id: user.id, email: user.email } as Pick<User, 'id' | 'email'>;
        next();
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default auth;
