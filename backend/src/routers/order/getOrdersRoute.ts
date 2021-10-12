import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../../models/orderModel';
import { isAdmin, isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orders = await Order.find({}).populate('user', 'firstName');

    if (orders.length !== 0) {
      res.send(orders);
      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Orders sent succesfully`
      );
    } else {
      res.status(404).send({ message: 'Orders Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Orders Not Found`
      );
    }
  })
);

export default router;
