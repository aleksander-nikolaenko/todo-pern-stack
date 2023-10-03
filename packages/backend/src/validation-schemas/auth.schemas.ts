/* eslint-disable newline-per-chained-call */
import joi from 'joi';
import { REGEXPS } from '../consts';

const passwordSchema = joi.string().min(8).regex(REGEXPS.password).required().messages({
  'string.min': '{{#label}} must have at least 8 characters',
  'string.pattern.base':
    '{{#label}} must contain at least one lowercase and uppercase letter, one digit, and one special character (!@#$%^&*)',
  'any.required': '{{#label}} is required.'
});
const emailSchema = joi.string().regex(REGEXPS.email).required().messages({
  'string.pattern.base': '{{#label}} format is not valid',
  'any.required': '{{#label}} is required.'
});

export const registerSchema = joi.object({
  email: emailSchema.label('Email'),
  password: passwordSchema.label('Password'),
  confirmPassword: joi.string().equal(joi.ref('password')).required().messages({
    'any.only': 'Passwords must match',
    'any.required': 'The repeat password field is required'
  })
});

export const loginSchema = joi.object({
  email: emailSchema.label('Email'),
  password: passwordSchema.label('Password')
});

export const forgotPasswordSchema = joi.object({
  email: emailSchema.label('Email')
});

export const changePasswordSchema = joi.object({
  email: emailSchema.label('Email'),
  oldPassword: passwordSchema.label('oldPassword'),
  newPassword: passwordSchema.label('newPassword')
});

export const userIdSchema = joi.object({
  id: joi.string().uuid().required().messages({
    'string.pattern.base': 'Wrong parameter',
    'string.base': 'Should be a type of "string"',
    'string.guid': 'Does not match format',
    'any.required': 'Missing "id" in request params'
  })
});
export const verifyTokenSchema = joi.object({
  token: joi.string().uuid().required().messages({
    'string.pattern.base': 'Wrong parameter',
    'string.base': 'Should be a type of "string"',
    'string.guid': 'Does not match format',
    'any.required': 'Missing "token" in request params'
  })
});
