import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../../models/orderModel';
import { isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    if (!orderId) {
      res.status(400).send({ message: 'Request missing order id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing order id. Required to get order.`
      );
      return;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).send({ message: 'Order Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Order Not Found. Cannot get order that does not exist.`
      );
      return;
    }

    res.status(200).send(order);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent order succesfully.`
    );
  })
);

export default router;
