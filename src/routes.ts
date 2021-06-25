import { Router } from 'express';
import AuthenticationController from './controllers/AuthenticationController';
import ComplimentsController from './controllers/ComplimentsController';
import TagsController from './controllers/TagsController';
import UsersController from './controllers/UsersController';
import ensureAdmin from './middlewares/EnsureAdmin';
import ensureAuthenticated from './middlewares/EnsureAuthenticated';

const router = Router();

const usersController = new UsersController();
const tagsController = new TagsController();
const authenticationController = new AuthenticationController();
const complimentsController = new ComplimentsController();

router.post('/users', usersController.handleCreateUser);
router.get(
  '/users',
  ensureAuthenticated,
  ensureAdmin,
  usersController.handleListUsers,
);

router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  tagsController.handleCreateTag,
);
router.get('/tags', tagsController.handleListTags);

router.post('/login', authenticationController.handleLogin);

router.post(
  '/compliments',
  ensureAuthenticated,
  complimentsController.handleCreateCompliment,
);
router.get(
  '/compliments/sent',
  ensureAuthenticated,
  complimentsController.handleListUsersSentCompliments,
);
router.get(
  '/compliments/received',
  ensureAuthenticated,
  complimentsController.handleListUsersReceivedCompliments,
);

export default router;
