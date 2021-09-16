import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../../models/orderModel';
import { isAdmin, isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    if (!orderId) {
      res.status(400).send({ message: 'Request missing order id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing order id. Required to edit order.`
      );
      return;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).send({ message: 'Order Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Order Not Found. Cannot edit order that does not exist.`
      );
      return;
    }

    order.isDelivered = true;
    order.isDeliveredAt = Date.now();

    const updatedorder = await order.save();

    res.status(200).send(updatedorder);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated order succesfully.`
    );
  })
);

export default router;
