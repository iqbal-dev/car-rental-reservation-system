import express from 'express';
import validateRequest from '../../middleware/validationRequest';
import { UserValidationSchema } from '../user/user.validation';
import { AuthServices } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidationSchema.userValidationSchema),
  AuthServices.signupUser,
);

export const AuthRouter = router;
