import express from 'express';
import getProductsRoute from './getProductsRoute';
import getProductRoute from './getProductRoute';
import deleteProductRoute from './deleteProductRoute';
import createProductRoute from './createProductRoute';
import editProductRoute from './editProductRoute';

const router = express.Router();

router.use('/products', getProductsRoute);
router.use('/products', getProductRoute);
router.use('/products', deleteProductRoute);
router.use('/products', createProductRoute);
router.use('/products', editProductRoute);

export default router;
