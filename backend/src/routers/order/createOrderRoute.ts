import express, { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../interfaces/express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../../models/orderModel';
import { isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req: GetUserAuthInfoRequest, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart Is Empty' });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentResult: req.body.paymentResult,
        totalPrice: req.body.totalPrice,
        user: req.user._id
      });
      const createdOrder = await order.save();
      res.status(200).send(createdOrder);
    }

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Order created succesfully succesfully.`
    );
  })
);

export default router;
