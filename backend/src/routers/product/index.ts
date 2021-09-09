import express from 'express';
import getProductsRoute from './getProducts';

const router = express.Router();

router.use('/products', getProductsRoute);

export default router;
