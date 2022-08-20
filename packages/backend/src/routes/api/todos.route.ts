import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { Todo } from '../../entities/todo.entity';
import { tryCatchWrapper, validation, isExist } from '../../middlewares';
import {
  paramsIdTodoSchema,
  createTodoSchema,
  updateTodoSchema
} from '../../validation-schemas/todo.schemas';

const todosRouter: Router = Router();
// @route   GET api/todos
// @desc    Get all todos
// @access  Public
todosRouter.get('', tryCatchWrapper(todoController.getAllTodo.bind(todoController)));

// @route   GET api/todos/:id
// @desc    Get todo by id
// @access  Public
todosRouter.get(
  '/:id',
  validation(paramsIdTodoSchema, 'params'),
  isExist(Todo),
  tryCatchWrapper(todoController.getTodoById.bind(todoController))
);

// @route   POST api/todos/
// @desc    Create new todo
// @access  Public
todosRouter.post(
  '',
  validation(createTodoSchema),
  tryCatchWrapper(todoController.createTodo.bind(todoController))
);

// @route   GET api/todos/:id
// @desc    Delete todo by id
// @access  Public
todosRouter.delete(
  '/:id',
  validation(paramsIdTodoSchema, 'params'),
  isExist(Todo),
  tryCatchWrapper(todoController.deleteTodoById.bind(todoController))
);

// @route   PUT api/todos
// @desc    Update todo by id
// @access  Public
todosRouter.patch(
  '/:id',
  validation(paramsIdTodoSchema, 'params'),
  isExist(Todo),
  validation(updateTodoSchema),
  tryCatchWrapper(todoController.updateTodoById.bind(todoController))
);

export default todosRouter;
