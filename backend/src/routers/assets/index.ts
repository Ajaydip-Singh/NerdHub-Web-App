import express from 'express';
import imageRoute from './image';

const router = express.Router();

router.use('/upload', imageRoute);

export default router;
