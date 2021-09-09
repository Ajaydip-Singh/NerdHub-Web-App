import express from 'express';
import getProductsRoute from './getProductsRoute';
import getProductRoute from './getProductRoute';

const router = express.Router();

router.use('/products', getProductsRoute);
router.use('/products', getProductRoute);

export default router;
