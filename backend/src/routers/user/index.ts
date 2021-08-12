import express from 'express';
import registerRoute from './registerRoute';
import loginRoute from './loginRoute';
import confirmUserRoute from './confirmUserRoute';
import userDetailsRoute from './userDetailsRoute';

const userRouter = express.Router();

userRouter.use('/users', registerRoute);
userRouter.use('/users', loginRoute);
userRouter.use('/users', userDetailsRoute);
userRouter.use('/users', confirmUserRoute);

export default userRouter;
