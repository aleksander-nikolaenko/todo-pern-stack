import { Router } from 'express';
import UserController from '../../controllers/user.controller';
import { auth, tryCatchWrapper, validation } from '../../middlewares';
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  verifyTokenSchema
} from '../../validation-schemas/auth.schemas';

const userRouter: Router = Router();

// @route   POST api/user/register
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
userRouter.post(
  '/register',
  validation(registerSchema),
  tryCatchWrapper(UserController.register.bind(UserController))
);

// @route   GET api/user/verify/:token
// @desc    Activate user account using activation link
// @access  Public
userRouter.get(
  '/verify/:token',
  validation(verifyTokenSchema, 'params'),
  tryCatchWrapper(UserController.verifyEmail.bind(UserController))
);

// @route   GET api/user/verify
// @desc    Activate user account using activation link
// @access  Public
userRouter.post(
  '/verify',
  validation(forgotPasswordSchema),
  tryCatchWrapper(UserController.resendVerifyEmail.bind(UserController))
);

// @route   POST api/user/login
// @desc    Login user given their email and password, returns the token upon successful login
// @access  Public
userRouter.post(
  '/login',
  validation(loginSchema),
  tryCatchWrapper(UserController.login.bind(UserController))
);

// @route   GET api/user
// @desc    Get user info through the token
// @access  Private
userRouter.get(
  '',
  auth({ omit: false }),
  tryCatchWrapper(UserController.currentUser.bind(UserController))
);

// @route   PATCH api/user/forgot
// @desc    Reset user's password using reset email
// @access  Public
userRouter.post(
  '/forgot',
  validation(forgotPasswordSchema),
  tryCatchWrapper(UserController.forgotPassword.bind(UserController))
);

// @route   PATCH api/auth/change-password
// @desc    Change user password
// @access  Private
userRouter.patch(
  '/change-password',
  auth({ omit: false }),
  validation(changePasswordSchema),
  tryCatchWrapper(UserController.changePassword.bind(UserController))
);
// @route   PATCH api/auth/logout
// @desc    Logout user
// @access  Private
userRouter.get(
  '/logout',
  auth({ omit: false }),
  tryCatchWrapper(UserController.logout.bind(UserController))
);

export default userRouter;
