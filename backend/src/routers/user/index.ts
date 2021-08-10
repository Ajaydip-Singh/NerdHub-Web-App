import express from 'express';
import registerRoute from './registerRoute';
import loginRoute from './loginRoute';

const userRouter = express.Router();

userRouter.use('/users', registerRoute);
userRouter.use('/users', loginRoute);

export default userRouter;
