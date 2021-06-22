import { Router } from 'express';
import UsersController from './controllers/UsersController';

const router = Router();

const usersController = new UsersController();

router.post('/users', usersController.handleCreateUser);

export default router;
