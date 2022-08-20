// eslint-disable-next-line import/no-extraneous-dependencies
import joi from 'joi';

export const createTodoSchema = joi.object({
  // eslint-disable-next-line newline-per-chained-call
  title: joi.string().min(3).max(50).required().messages({
    'string.pattern.base': 'Wrong parameter',
    'string.base': 'Should be a type of "string"',
    'string.max': 'Title to long',
    'string.min': 'Title to short',
    'any.required': 'Title is a required field'
  }),
  // eslint-disable-next-line newline-per-chained-call
  description: joi.string().min(3).max(1500).messages({
    'string.pattern.base': 'Wrong parameter',
    'string.base': 'Should be a type of "string"',
    'string.max': 'Description to long',
    'string.min': 'Description to short'
  }),
  isCompleted: joi.boolean().messages({
    'boolean.pattern.base': 'Wrong parameter',
    'boolean.base': 'Should be a type of "boolean"'
  })
});
export const updateTodoSchema = joi
  .object({
    // eslint-disable-next-line newline-per-chained-call
    title: joi.string().min(3).max(50).messages({
      'string.pattern.base': 'Wrong parameter',
      'string.base': 'Should be a type of "string"',
      'string.max': 'Title to long',
      'string.min': 'Title to short',
      'any.required': 'Title is a required field'
    }),
    // eslint-disable-next-line newline-per-chained-call
    description: joi.string().min(3).max(1500).messages({
      'string.pattern.base': 'Wrong parameter',
      'string.base': 'Should be a type of "string"',
      'string.max': 'Description to long',
      'string.min': 'Description to short'
    }),
    isCompleted: joi.boolean().messages({
      'boolean.pattern.base': 'Wrong parameter',
      'boolean.base': 'Should be a type of "boolean"'
    })
  })
  .or('title', 'description', 'isCompleted')
  .messages({
    'object.missing':
      'Request body must contain at least one of properties [title, description, isCompleted]'
  });

export const paramsIdTodoSchema = joi.object({
  id: joi.string().uuid().required().messages({
    'string.pattern.base': 'Wrong parameter',
    'string.base': 'Should be a type of "boolean"',
    'string.guid': 'Does not match uuid type',
    'any.required': 'Missing "id" in request params'
  })
});
