import express from 'express';
import getOrdersRoute from './getOrdersRoute';
import getOrderRoute from './getOrderRoute';
import deleteOrderRoute from './deleteOrderRoute';
import createOrderRoute from './createOrderRoute';
import editOrderRoute from './editOrderDeliverRoute';
import getUserOrdersRoute from './getUserOrdersRoute';

const router = express.Router();

router.use('/orders', getOrdersRoute);
router.use('/orders', getUserOrdersRoute);
router.use('/orders', getOrderRoute);
router.use('/orders', deleteOrderRoute);
router.use('/orders', createOrderRoute);
router.use('/orders', editOrderRoute);

export default router;
