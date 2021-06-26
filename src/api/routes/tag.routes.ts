import { Router } from 'express';
import TagsController from '../controllers/TagsController';
import ensureAdmin from '../middlewares/EnsureAdmin';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

const tagRouter = Router();

const tagsController = new TagsController();

tagRouter.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  tagsController.handleCreateTag,
);
tagRouter.get('/tags', tagsController.handleListTags);

export default tagRouter;
