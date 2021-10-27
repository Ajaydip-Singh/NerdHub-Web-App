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
    const pageSize = 5;
    const pageNumber = Number(req.query.pageNumber) || 1;

    const count = await Order.countDocuments({}).populate('user', 'email');
    const orders = await Order.find({})
      .populate('user', 'email')
      .sort({ _id: -1 })
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize);

    if (orders.length !== 0) {
      res.send({ orders, pageNumber, pages: Math.ceil(count / pageSize) });
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
