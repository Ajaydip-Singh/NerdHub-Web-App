import express from 'express';
import getProductsRoute from './getProductsRoute';
import getProductRoute from './getOrderRoute';
import deleteProductRoute from './deleteOrderRoute';
import createProductRoute from './createOrderRoute';
import editProductRoute from './editOrderDeliverRoute';
import getProductsCategoriesRoute from './getProductsCategoriesRoute';
import getProductsBrandRoute from './getProductsBrandsRoute';

const router = express.Router();

router.use('/products', getProductsCategoriesRoute);
router.use('/products', getProductsBrandRoute);
router.use('/products', getProductsRoute);
router.use('/products', getProductRoute);
router.use('/products', deleteProductRoute);
router.use('/products', createProductRoute);
router.use('/products', editProductRoute);

export default router;
