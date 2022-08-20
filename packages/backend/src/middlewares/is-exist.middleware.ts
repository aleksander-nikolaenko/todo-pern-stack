import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import HttpException from '../exceptions/http.exception';
import { AppDataSource } from '../config/database';

const isExist =
  (entity: EntityTarget<ObjectLiteral>) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const repository = AppDataSource.getRepository(entity);

      const result = await repository.findOneBy({ id });

      if (!result) {
        throw new HttpException(404, `${repository.metadata.name} with id ${id} not found`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default isExist;
