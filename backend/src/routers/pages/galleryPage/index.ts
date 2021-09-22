import express from 'express';
import getGalleryPageContent from './getGalleryPageContent';
import editGalleryPageContent from './editGalleryPageContent';


const router = express.Router();

router.use('/gallery-page-content', getGalleryPageContent);
router.use('/gallery-page-content', editGalleryPageContent);

export default router;
