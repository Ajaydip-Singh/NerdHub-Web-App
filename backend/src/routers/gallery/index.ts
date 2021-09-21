import express from 'express';
import getGalleryRoute from './getGalleryRoute';
import getGalleryTagsRoute from './getGalleryTagsRoute';

const router = express.Router();

router.use('/gallery', getGalleryTagsRoute);
router.use('/gallery', getGalleryRoute);

export default router;
