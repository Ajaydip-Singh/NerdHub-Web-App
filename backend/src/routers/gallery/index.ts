import express from 'express';
import getGalleryRoute from './getGalleryRoute';
import getGalleryTagsRoute from './getGalleryTagsRoute';

const router = express.Router();

router.use('/gallery', getGalleryRoute);
router.use('/gallery', getGalleryTagsRoute);

export default router;
