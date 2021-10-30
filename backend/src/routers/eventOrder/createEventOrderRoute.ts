import express, { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../interfaces/express';
import expressAsyncHandler from 'express-async-handler';
import EventOrder from '../../models/eventOrderModel';
import { isAuth } from '../../utils/general';
import logger from '../../utils/logger';
import { mailGenerator } from '../../utils/mail/mail';
import { shopEventOrderReceiptEmailTemplate } from '../../utils/mail/templates';
import User from '../../models/userModel';
import Event from '../../models/eventModel';
import sgMail from '@sendgrid/mail';

const router = express.Router();

router.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req: GetUserAuthInfoRequest, res: Response) => {
    const existingEventOrder = await EventOrder.findById(req.body._id);
    if (existingEventOrder) {
      res.status(400).send({ message: 'Event Order exists already' });
      return;
    }

    const eventOrder = new EventOrder({
      _id: req.body._id,
      event: req.body.event,
      paymentResult: req.body.paymentResult,
      totalPrice: req.body.totalPrice,
      user: req.body.user
    });
    const createdEventOrder = await eventOrder.save();
    res.status(200).send(createdEventOrder);

    const user = await User.findById(req.body.user);
    const event = await Event.findById(req.body.event);

    const stripHtml = (html: any) => {
      return html.replace(/<\s*[^>]*>/gi, '');
    };

    const msg = {
      from: process.env.MAIL_FROM,
      to: `<${user.email}>`,
      subject: `Nerdhub: Event Order ${req.body._id} received`,
      html: mailGenerator.generate(
        shopEventOrderReceiptEmailTemplate(user, {
          name: stripHtml(event.name),
          price: req.body.totalPrice + ' KES'
        })
      )
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    try {
      await sgMail.send(<any>msg);
    } catch (err) {
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Cannot send eventOrder placement receipt email`
      );
    }

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : EventOrder created succesfully.`
    );
  })
);

export default router;
