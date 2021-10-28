import express from 'express';
import getOrderHistoryPageContent from './getOrderHistoryPageContent';
import editOrderHistoryPageContent from './editOrderHistoryPageContent';

const router = express.Router();

router.use('/orderHistory-page-content', getOrderHistoryPageContent);
router.use('/orderHistory-page-content', editOrderHistoryPageContent);

export default router;
