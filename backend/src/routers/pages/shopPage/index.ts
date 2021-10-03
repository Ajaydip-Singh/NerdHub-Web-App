import express from 'express';
import getShopPageContent from './getShopPageContent';
import editShopPageContent from './editShopPageContent';

const router = express.Router();

router.use('/shop-page-content', getShopPageContent);
router.use('/shop-page-content', editShopPageContent);

export default router;
