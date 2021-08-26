import express from 'express';
import getHomePageContent from './getAboutPageContent';
import editHomePageContent from './editAboutPageContent';

const router = express.Router();

router.use('/home-page-content', getHomePageContent);
router.use('/home-page-content', editHomePageContent);

export default router;
