import express from 'express';
import homePageContentRouter from './homePage';
import aboutPageContentRouter from './aboutPage';
import contactPageContentRouter from './contactPage';
import cartPageContentRouter from './cartPage';

const router = express.Router();

router.use('/pages', homePageContentRouter);
router.use('/pages', aboutPageContentRouter);
router.use('/pages', contactPageContentRouter);
router.use('/pages', cartPageContentRouter);

export default router;
