import { Router } from 'express';
import { AuthRouter } from '../module/auth/auth.router';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
