import express, { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../interfaces/express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../../models/orderModel';
import { isAuth } from '../../utils/general';
import logger from '../../utils/logger';
import { mailGenerator } from '../../utils/mail/mail';
import { shopOrderReceiptEmailTemplate } from '../../utils/mail/templates';
import User from '../../models/userModel';
import sgMail from '@sendgrid/mail';

const router = express.Router();

router.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req: GetUserAuthInfoRequest, res: Response) => {
    const existingOrder = await Order.findById(req.body._id);
    if (existingOrder) {
      res.status(400).send({ message: 'Order exists already' });
      return;
    }

    const order = new Order({
      _id: req.body._id,
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentResult: req.body.paymentResult,
      totalPrice: req.body.totalPrice,
      user: req.body.user
    });
    const createdOrder = await order.save();
    res.status(200).send(createdOrder);

    const user = await User.findById(req.body.user);

    const msg = {
      from: process.env.MAIL_FROM,
      to: `<${user.email}>`,
      subject: `Nerdhub:  Order ${req.body._id} received`,
      html: mailGenerator.generate(
        shopOrderReceiptEmailTemplate(user, req.body.orderItems)
      )
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    try {
      await sgMail.send(<any>msg);
    } catch (err) {
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Cannot send order placement receipt email`
      );
    }

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Order created succesfully.`
    );
  })
);

export default router;
