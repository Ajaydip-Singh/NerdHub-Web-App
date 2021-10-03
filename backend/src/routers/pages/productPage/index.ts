import express from 'express';
import getProductPageContent from './getProductPageContent';
import editProductPageContent from './editProductPageContent';

const router = express.Router();

router.use('/product-page-content', getProductPageContent);
router.use('/product-page-content', editProductPageContent);

export default router;
