import express from 'express';
import getOrderPageContent from './getOrderPageContent';
import editOrderPageContent from './editOrderPageContent';

const router = express.Router();

router.use('/order-page-content', getOrderPageContent);
router.use('/order-page-content', editOrderPageContent);

export default router;
