import { Router } from 'express';
import ComplimentsController from '../controllers/ComplimentsController';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

const complimentRouter = Router();

const complimentsController = new ComplimentsController();

complimentRouter.post(
  '/compliments',
  ensureAuthenticated,
  complimentsController.handleCreateCompliment,
);
complimentRouter.get(
  '/compliments/sent',
  ensureAuthenticated,
  complimentsController.handleListUsersSentCompliments,
);
complimentRouter.get(
  '/compliments/received',
  ensureAuthenticated,
  complimentsController.handleListUsersReceivedCompliments,
);

export default complimentRouter;
