import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validationRequest';
import { USER_ROLE } from '../user/user.constant';
import { BookingControllers } from './booking.controller';
import { BookingValidationSchema } from './booking.validation';
const router = express.Router();

router
  .route('/')
  .post(
    auth(USER_ROLE.user),
    validateRequest(BookingValidationSchema.createBookingSchema),
    BookingControllers.createBooking,
  )
  .get(
    auth(USER_ROLE.admin),
    validateRequest(BookingValidationSchema.queryBookingSchema),
    BookingControllers.getAllBookings,
  );

router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingControllers.getAllBookingsByUser,
);
router.put('/return', BookingControllers.updateBookingTimeAndPrice);

export const BookingRoute = router;
