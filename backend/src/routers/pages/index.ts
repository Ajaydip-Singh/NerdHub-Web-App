import express from 'express';
import homePageContentRouter from './homePage';

const router = express.Router();

router.use('/pages', homePageContentRouter);

export default router;
