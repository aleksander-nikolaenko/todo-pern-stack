import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../entities/user.entity';
import HttpException from '../exceptions/http.exception';

const auth =
  ({ omit }: { omit: boolean }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await new Promise<void>((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
          if (err) {
            reject(new HttpException(400, err.message));
            return;
          }

          if (!omit && !user) {
            reject(new HttpException(401, 'Not authorized'));
            return;
          }

          req.user = { id: user.id, email: user.email } as Pick<User, 'id' | 'email'>;
          resolve();
        })(req, res, next);
      });
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
