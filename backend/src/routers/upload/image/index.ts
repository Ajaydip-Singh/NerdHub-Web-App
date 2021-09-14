import express from 'express';
import imageUploadRoute from './imageUpload';
import multipleImagesUploadRoute from './multipleImagesUploadRoute';

const router = express.Router();

router.use('/image', multipleImagesUploadRoute);
router.use('/image', imageUploadRoute);

export default router;
