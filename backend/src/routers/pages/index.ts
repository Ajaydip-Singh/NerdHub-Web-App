import express from 'express';
import homePageContentRouter from './homePage';
import aboutPageContentRouter from './aboutPage';

const router = express.Router();

router.use('/pages', homePageContentRouter);
router.use('/pages', aboutPageContentRouter);

export default router;
