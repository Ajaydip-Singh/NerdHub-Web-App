import express from 'express';
import getHomePageContent from './getHomePageContent';
import editHomePageContent from './editHomePageContent';

const router = express.Router();

router.use('/home-page-content', getHomePageContent);
router.use('/home-page-content', editHomePageContent);

export default router;
