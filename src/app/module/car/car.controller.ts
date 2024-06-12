import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), (req, res) => {
  res.send('Hello World');
});

router.post('/', (req, res) => {
  res.send('Hello World');
});

router.put('/', (req, res) => {
  res.send('Hello World');
});

router.delete('/', (req, res) => {
  res.send('Hello World');
});

export const CarRouter = router;
