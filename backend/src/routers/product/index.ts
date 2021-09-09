import express from 'express';
import getProductsRoute from './getProductsRoute';
import getProductRoute from './getProductRoute';
import deleteProductRoute from './deleteProductRoute';

const router = express.Router();

router.use('/products', getProductsRoute);
router.use('/products', getProductRoute);
router.use('/products', deleteProductRoute);

export default router;
