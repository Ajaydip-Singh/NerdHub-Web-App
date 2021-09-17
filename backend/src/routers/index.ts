import express from 'express';
import userRouter from './user';
import configRouter from './configRoute';
import eventRouter from './event';
import pagesRouter from './pages';
import uploadRouter from './assets';
import productRouter from './product';

const router = express.Router();

router.use('/', userRouter);
router.use('/', configRouter);
router.use('/', eventRouter);
router.use('/', pagesRouter);
router.use('/', uploadRouter);
router.use('/', productRouter);

export default router;
