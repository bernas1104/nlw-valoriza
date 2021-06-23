import { Router } from 'express';
import TagsController from './controllers/TagsController';
import UsersController from './controllers/UsersController';
import ensureAdmin from './middlewares/EnsureAdmin';

const router = Router();

const usersController = new UsersController();
const tagsController = new TagsController();

router.post('/users', usersController.handleCreateUser);
router.post('/tags', ensureAdmin, tagsController.handleCreateTag);

export default router;
