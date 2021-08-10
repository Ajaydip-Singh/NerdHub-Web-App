import express from 'express';
import registerRoute from './registerRoute';

const userRouter = express.Router();

userRouter.use('/users', registerRoute);

export default userRouter;
