import express from 'express';
import getGalleryRoute from './getGalleryRoute';
import getGalleryTagsRoute from './getGalleryTagsRoute';
import deleteGalleryRoute from './deleteGalleryRoute';
import editGalleryRoute from './editGalleryRoute';
import getGalleryItemRoute from './getGalleryItemRoute';

const router = express.Router();

router.use('/gallery', getGalleryTagsRoute);
router.use('/gallery', getGalleryRoute);
router.use('/gallery', deleteGalleryRoute);
router.use('/gallery', editGalleryRoute);
router.use('/gallery', getGalleryItemRoute);

export default router;
