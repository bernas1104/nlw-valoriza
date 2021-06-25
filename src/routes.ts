import { Router } from 'express';
import AuthenticationController from './controllers/AuthenticationController';
import ComplimentsController from './controllers/ComplimentsController';
import TagsController from './controllers/TagsController';
import UsersController from './controllers/UsersController';
import ensureAdmin from './middlewares/EnsureAdmin';

const router = Router();

const usersController = new UsersController();
const tagsController = new TagsController();
const authenticationController = new AuthenticationController();
const complimentsController = new ComplimentsController();

router.post('/users', usersController.handleCreateUser);
router.post('/tags', ensureAdmin, tagsController.handleCreateTag);
router.post('/login', authenticationController.handleLogin);
router.post('/compliments', complimentsController.handleCreateCompliment);

export default router;
