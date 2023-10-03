import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { Todo } from '../../entities/todo.entity';
import { tryCatchWrapper, validation, isExist, auth } from '../../middlewares';
import {
  paramsIdTodoSchema,
  createTodoSchema,
  updateTodoSchema
} from '../../validation-schemas/todo.schemas';

const todosRouter: Router = Router();
// @route   GET api/todos
// @desc    Get all todos
// @access  Public
todosRouter.get(
  '',
  auth({ omit: true }),
  tryCatchWrapper(todoController.getAllTodo.bind(todoController))
);

// @route   GET api/todos/:id
// @desc    Get todo by id
// @access  Public
todosRouter.get(
  '/:id',
  auth({ omit: true }),
  validation(paramsIdTodoSchema, 'params'),
  isExist(Todo),
  tryCatchWrapper(todoController.getTodoById.bind(todoController))
);

// @route   POST api/todos/
// @desc    Create new todo
// @access  Private
todosRouter.post(
  '',
  auth({ omit: false }),
  validation(createTodoSchema),
  tryCatchWrapper(todoController.createTodo.bind(todoController))
);

// @route   DELETE api/todos/:id
// @desc    Delete todo by id
// @access  Private
todosRouter.delete(
  '/:id',
  auth({ omit: false }),
  validation(paramsIdTodoSchema, 'params'),
  isExist(Todo),
  tryCatchWrapper(todoController.deleteTodoById.bind(todoController))
);

// @route   PATCH api/todos/:id
// @desc    Update todo by id
// @access  Private
todosRouter.patch(
  '/:id',
  auth({ omit: false }),
  validation(paramsIdTodoSchema, 'params'),
  isExist(Todo),
  validation(updateTodoSchema),
  tryCatchWrapper(todoController.updateTodoById.bind(todoController))
);

export default todosRouter;
