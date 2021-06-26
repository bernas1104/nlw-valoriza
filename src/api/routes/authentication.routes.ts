import { Router } from 'express';
import AuthenticationControler from '../controllers/AuthenticationController';

const authenticateRouter = Router();

const authenticationController = new AuthenticationControler();

authenticateRouter.post('/login', authenticationController.handleLogin);

export default authenticateRouter;
