import express, { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../interfaces/express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../../models/orderModel';
import { isAuth } from '../../utils/general';
import logger from '../../utils/logger';
import nodemailer from 'nodemailer';
import { mailGenerator } from '../../utils/mail/mail';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { shopOrderReceiptEmailTemplate } from '../../utils/mail/templates';
import User from '../../models/userModel';

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

    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    } as SMTPTransport.Options);

    const user = await User.findById(req.body.user);

    try {
      await transport.sendMail({
        from: process.env.MAIL_FROM,
        to: `<${user.email}>`,
        subject: `Nerdhub:  Order ${req.body._id} received`,
        html: mailGenerator.generate(
          shopOrderReceiptEmailTemplate(user, req.body.orderItems)
        )
      });
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
