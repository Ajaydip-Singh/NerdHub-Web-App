import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import express from 'express';
import axios from 'axios';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { PesaPalClient } from '../../utils/pesaPal';
import Order from '../../models/orderModel';
import { mailGenerator } from '../../utils/mail/mail';
import User from '../../models/userModel';
import {
  shopPaymentReceiptEmailTemplateFail,
  shopPaymentReceiptEmailTemplateSuccess
} from '../../utils/mail/templates';
import logger from '../../utils/logger';
import EventOrder from '../../models/eventOrderModel';

const router = express.Router();

router.get(
  '/order/status',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const pesapal_notification_type = req.query.pesapal_notification_type;
    const pesapal_transaction_tracking_id =
      req.query.pesapal_transaction_tracking_id;
    const pesapal_merchant_reference = req.query
      .pesapal_merchant_reference as string;

    if (
      !pesapal_notification_type ||
      !pesapal_transaction_tracking_id ||
      !pesapal_merchant_reference
    ) {
      res
        .status(400)
        .send({ message: 'Request missing key query parameters.' });
      return;
    }

    if ((pesapal_notification_type as string) == 'CHANGE') {
      const client = new PesaPalClient();
      const request = client.queryPaymentStatusByMerchantRef(
        pesapal_merchant_reference as string
      );

      const { data } = await axios.get(request);

      const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      } as SMTPTransport.Options);

      let order;

      if (pesapal_merchant_reference.includes('/')) {
        order = await EventOrder.findById(pesapal_merchant_reference);
      } else {
        order = await Order.findById(pesapal_merchant_reference);
      }

      // Get User to send confirmation that order is paid
      const user = await User.findById(order.user._id);

      if (
        data == 'pesapal_response_data=COMPLETED' &&
        pesapal_merchant_reference
      ) {
        if (!order.isPaid) {
          order.paymentResult.status = 'COMPLETED';
          order.isPaid = true;
          order.paidAt = Date.now();
          const updatedOrder = await order.save();

          try {
            await transport.sendMail({
              from: process.env.MAIL_FROM,
              to: `<${user.email}>`,
              subject: `Nerdhub: Payment Received for Order ${updatedOrder._id}`,
              html: mailGenerator.generate(
                shopPaymentReceiptEmailTemplateSuccess(user, updatedOrder._id)
              )
            });
          } catch (err) {
            logger.error(
              `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Cannot send order payment receipt success email`
            );
          }
        }
      } else if (data == 'pesapal_response_data=FAILED') {
        // Send failure to user since order failed

        try {
          await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: `<${user.email}>`,
            subject: `Nerdhub: Payment Failed for Order ${order._id}`,
            html: mailGenerator.generate(
              shopPaymentReceiptEmailTemplateFail(user, order._id)
            )
          });
        } catch (err) {
          logger.error(
            `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Cannot send order payment receipt failure email`
          );
        }
        await order.remove();
      }
    }
    res.status(200).send({
      pesapal_notification_type,
      pesapal_transaction_tracking_id,
      pesapal_merchant_reference
    });
    return;
  })
);

export default router;
