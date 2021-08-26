import express from 'express';
import userRouter from './user';
import configRouter from './configRoute';
import eventRouter from './event';
import pagesRouter from './pages';

const router = express.Router();

router.use('/', userRouter);
router.use('/', configRouter);
router.use('/', eventRouter);
router.use('/', pagesRouter);

export default router;
