import express from 'express';
import postOrder from './postOrder';
import statusOrder from './statusOrder';

const router = express.Router();

router.use('/pesapal', postOrder);
router.use('/pesapal', statusOrder);

export default router;
