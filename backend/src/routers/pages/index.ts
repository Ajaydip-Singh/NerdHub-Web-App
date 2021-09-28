import express from 'express';
import homePageContentRouter from './homePage';
import aboutPageContentRouter from './aboutPage';
import contactPageContentRouter from './contactPage';
import cartPageContentRouter from './cartPage';
import galleryPageContentRouter from './galleryPage';
import membershipPageContentRouter from './membershipPage';
import footerContentRouter from './footer';

const router = express.Router();

router.use('/pages', homePageContentRouter);
router.use('/pages', aboutPageContentRouter);
router.use('/pages', contactPageContentRouter);
router.use('/pages', cartPageContentRouter);
router.use('/pages', galleryPageContentRouter);
router.use('/pages', membershipPageContentRouter);
router.use('/pages', footerContentRouter);

export default router;
