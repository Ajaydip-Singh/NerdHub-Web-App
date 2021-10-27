import express from 'express';
import userRouter from './user';
import configRouter from './configRoute';
import eventRouter from './event';
import pagesRouter from './pages';
import uploadRouter from './assets';
import productRouter from './product';
import galleryRouter from './gallery';
import orderRouter from './order';
import eventOrderRouter from './eventOrder';
import membershipOrderRouter from './membershipOrder';
import pesapalRouter from './pesapal';
import comicRouter from './comic';

const router = express.Router();

router.use('/', userRouter);
router.use('/', configRouter);
router.use('/', eventRouter);
router.use('/', pagesRouter);
router.use('/', uploadRouter);
router.use('/', productRouter);
router.use('/', galleryRouter);
router.use('/', orderRouter);
router.use('/', eventOrderRouter);
router.use('/', membershipOrderRouter);
router.use('/', pesapalRouter);
router.use('/', comicRouter);

export default router;
