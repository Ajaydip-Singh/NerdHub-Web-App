import express from 'express';
import getGalleryRoute from './getGalleryRoute';
import getGalleryTagsRoute from './getGalleryTagsRoute';
import deleteGalleryRoute from './deleteGalleryRoute';

const router = express.Router();

router.use('/gallery', getGalleryTagsRoute);
router.use('/gallery', getGalleryRoute);
router.use('/gallery', deleteGalleryRoute);

export default router;
