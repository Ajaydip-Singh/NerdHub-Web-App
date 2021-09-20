import express from 'express';
import getGalleryRoute from './getGalleryRoute';

const router = express.Router();

router.use('/gallery', getGalleryRoute);

export default router;
