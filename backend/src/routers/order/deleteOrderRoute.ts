import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../../models/orderModel';
import { isAdmin, isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    if (!orderId) {
      res.status(400).send({ message: 'Request missing order id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing order id. Required to delete order.`
      );
      return;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).send({ message: 'Order Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Order Not Found. Cannot delete order that does not exist.`
      );
      return;
    }

    const deletedorder = await order.remove();
    res.status(200).send(deletedorder);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Deleted order succesfully.`
    );
  })
);

export default router;
