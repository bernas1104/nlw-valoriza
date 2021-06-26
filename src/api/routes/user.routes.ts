import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import ensureAdmin from '../middlewares/EnsureAdmin';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

const userRouter = Router();

const usersController = new UsersController();

userRouter.post('/users', usersController.handleCreateUser);
userRouter.get(
  '/users',
  ensureAuthenticated,
  ensureAdmin,
  usersController.handleListUsers,
);

export default userRouter;
