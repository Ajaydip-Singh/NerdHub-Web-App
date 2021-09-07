import express from 'express';
import imageUploadRoute from './imageUpload';

const router = express.Router();

router.use('/image', imageUploadRoute);

export default router;
