import express from 'express';
import getAboutPageContent from './getAboutPageContent';
import editAboutPageContent from './editAboutPageContent';


const router = express.Router();

router.use('/about-page-content', getAboutPageContent);
router.use('/about-page-content', editAboutPageContent);

export default router;
