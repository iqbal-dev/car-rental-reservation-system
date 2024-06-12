import { Router } from 'express';
import { AuthRouter } from '../module/auth/auth.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
