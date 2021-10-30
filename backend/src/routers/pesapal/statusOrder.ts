import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import express from 'express';
import axios from 'axios';
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
import MembershipOrder from '../../models/membershipOrderModel';
import sgMail from '@sendgrid/mail';

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

    let responseData;

    if ((pesapal_notification_type as string) == 'CHANGE') {
      const client = new PesaPalClient();
      const request = client.queryPaymentStatusByMerchantRef(
        pesapal_merchant_reference as string
      );

      const { data } = await axios.get(request);
      responseData = data;

      let order;

      if (pesapal_merchant_reference.includes('/')) {
        order = await EventOrder.findById(pesapal_merchant_reference);
      } else if (pesapal_merchant_reference.includes('-')) {
        order = await MembershipOrder.findById(pesapal_merchant_reference);
      } else {
        order = await Order.findById(pesapal_merchant_reference);
      }

      // Get User to send confirmation that order is paid
      const user = await User.findById(order.user._id);

      // Setup sgMail
      sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

      if (
        data == 'pesapal_response_data=COMPLETED' &&
        pesapal_merchant_reference
      ) {
        if (!order.isPaid) {
          order.paymentResult.status = 'COMPLETED';
          order.isPaid = true;
          order.paidAt = Date.now();
          const updatedOrder = await order.save();

          const msg = {
            from: process.env.MAIL_FROM,
            to: `<${user.email}>`,
            subject: `Nerdhub: Payment Received for Order ${updatedOrder._id}`,
            html: mailGenerator.generate(
              shopPaymentReceiptEmailTemplateSuccess(user, updatedOrder._id)
            )
          };

          try {
            await sgMail.send(<any>msg);
          } catch (err) {
            logger.error(
              `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Cannot send order payment receipt success email`
            );
          }
        }
      } else if (data == 'pesapal_response_data=FAILED') {
        // Send failure to user since order failed

        const msg = {
          from: process.env.MAIL_FROM,
          to: `<${user.email}>`,
          subject: `Nerdhub: Payment Failed for Order ${order._id}`,
          html: mailGenerator.generate(
            shopPaymentReceiptEmailTemplateFail(user, order._id)
          )
        };

        try {
          await sgMail.send(<any>msg);
        } catch (err) {
          logger.error(
            `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Cannot send order payment receipt failure email`
          );
        }
        await order.remove();
      }
    }
    if (req.query.admin) {
      res.status(200).send({
        status: responseData.split('=')[1]
      });
    } else {
      res.status(200).send({
        pesapal_notification_type,
        pesapal_transaction_tracking_id,
        pesapal_merchant_reference
      });
    }
    return;
  })
);

export default router;
