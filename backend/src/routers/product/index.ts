import express from 'express';
import getProductsRoute from './getProductsRoute';
import getProductRoute from './getProductRoute';
import deleteProductRoute from './deleteProductRoute';
import createProductRoute from './createProductRoute';

const router = express.Router();

router.use('/products', getProductsRoute);
router.use('/products', getProductRoute);
router.use('/products', deleteProductRoute);
router.use('/products', createProductRoute);

export default router;
