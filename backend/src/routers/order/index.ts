import express from 'express';
import getProductsRoute from './getOrdersRoute';
import getProductRoute from './getOrderRoute';
import deleteProductRoute from './deleteOrderRoute';
import createProductRoute from './createOrderRoute';
import editProductRoute from './editOrderDeliverRoute';

const router = express.Router();

router.use('/orders', getProductsRoute);
router.use('/orders', getProductRoute);
router.use('/orders', deleteProductRoute);
router.use('/orders', createProductRoute);
router.use('/orders', editProductRoute);

export default router;
