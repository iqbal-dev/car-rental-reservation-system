import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validationRequest';
import { USER_ROLE } from '../user/user.constant';
import { CarControllers } from './car.controller';
import { CarValidation } from './car.validation';

const router = express.Router();

router
  .route('/')
  .post(
    auth(USER_ROLE.admin),
    validateRequest(CarValidation.createCarValidationSchema),
    CarControllers.createCar,
  );

export const CarRouter = router;
