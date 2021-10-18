import express from 'express';
import getSocialMediaContent from './getSocialMediaContent';
import editSocialMediaContent from './editSocialMediaContent';

const router = express.Router();

router.use('/socialMedia-content', getSocialMediaContent);
router.use('/socialMedia-content', editSocialMediaContent);

export default router;