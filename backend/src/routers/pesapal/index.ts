import express from 'express';
import postOrder from './postOrder';

const router = express.Router();

router.use('/pesapal', postOrder);

export default router;
