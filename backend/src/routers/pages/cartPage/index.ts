import express from 'express';
import getCartPageContent from './getCartPageContent';
import editCartPageContent from './editCartPageContent';


const router = express.Router();

router.use('/cart-page-content', getCartPageContent);
router.use('/cart-page-content', editCartPageContent);

export default router;
