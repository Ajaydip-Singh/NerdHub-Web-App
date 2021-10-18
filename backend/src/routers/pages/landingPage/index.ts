import express from 'express';
import getLandingPageContent from './getLandingPageContent';
import editLandingPageContent from './editLandingPageContent';

const router = express.Router();

router.use('/landing-page-content', getLandingPageContent);
router.use('/landing-page-content', editLandingPageContent);

export default router;
