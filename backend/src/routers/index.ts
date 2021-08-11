import express from 'express';
import userRouter from './user';
import configRouter from './configRoute';

const router = express.Router();

router.use('/', userRouter);
router.use('/', configRouter);

export default router;
