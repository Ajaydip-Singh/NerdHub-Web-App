import express from 'express';
import userRouter from './user';
import configRouter from './configRoute';
import eventRouter from './event';

const router = express.Router();

router.use('/', userRouter);
router.use('/', configRouter);
router.use('/', eventRouter);

export default router;
