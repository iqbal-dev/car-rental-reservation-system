import { Router } from 'express';
import { AuthRouter } from '../module/auth/auth.router';
import { BookingRoute } from '../module/booking/booking.route';
import { CarRouter } from '../module/car/car.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/cars',
    route: CarRouter,
  },
  {
    path: '/bookings',
    route: BookingRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
