import express from 'express';
import uploadImageRoute from './uploadImageRoute';
import uploadMultipleImagesRoute from './uploadMultipleImagesRoute';

const router = express.Router();

router.use('/image', uploadMultipleImagesRoute);
router.use('/image', uploadImageRoute);

export default router;
