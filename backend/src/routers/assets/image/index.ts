import express from 'express';
import uploadImageRoute from './uploadImageRoute';
import uploadMultipleImagesRoute from './uploadMultipleImagesRoute';
import getImagesRoute from './getImagesRoute';

const router = express.Router();

router.use('/image', uploadMultipleImagesRoute);
router.use('/image', uploadImageRoute);
router.use('/image', getImagesRoute);

export default router;
