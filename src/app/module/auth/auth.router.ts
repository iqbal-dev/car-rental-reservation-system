import express from 'express';
import validateRequest from '../../middleware/validationRequest';
import { UserValidationSchema } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { LoginValidationSchema } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidationSchema.userValidationSchema),
  AuthControllers.signupUser,
);
router.post(
  '/login',
  validateRequest(LoginValidationSchema.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRouter = router;
