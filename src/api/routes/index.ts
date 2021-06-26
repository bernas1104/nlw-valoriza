import { Router } from 'express';
import authenticationRouter from './authentication.routes';
import complimentRouter from './compliment.routes';
import tagRouter from './tag.routes';
import userRouter from './user.routes';

const router = Router();

router.use(authenticationRouter);
router.use(userRouter);
router.use(tagRouter);
router.use(complimentRouter);

export default router;
