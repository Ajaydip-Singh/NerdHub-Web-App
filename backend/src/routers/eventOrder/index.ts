import express from 'express';
import getOrdersRoute from './getEventOrdersRoute';
import deleteOrderRoute from './deleteEventOrderRoute';
import createOrderRoute from './createEventOrderRoute';
import getUserOrdersRoute from './getUserEventOrdersRoute';

const router = express.Router();

router.use('/event-orders', getOrdersRoute);
router.use('/event-orders', getUserOrdersRoute);
router.use('/event-orders', deleteOrderRoute);
router.use('/event-orders', createOrderRoute);

export default router;
