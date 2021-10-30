import express, { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../interfaces/express';
import expressAsyncHandler from 'express-async-handler';
import MembershipOrder from '../../models/membershipOrderModel';
import { isAuth } from '../../utils/general';
import logger from '../../utils/logger';
import { mailGenerator } from '../../utils/mail/mail';
import User from '../../models/userModel';
import { shopMembershipOrderReceiptEmailTemplate } from '../../utils/mail/templates';
import sgMail from '@sendgrid/mail';

const router = express.Router();

router.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req: GetUserAuthInfoRequest, res: Response) => {
    const existingMembershipOrder = await MembershipOrder.findById(
      req.body._id
    );
    if (existingMembershipOrder) {
      res.status(400).send({ message: 'Membership Order exists already' });
      return;
    }

    const membershipOrder = new MembershipOrder({
      _id: req.body._id,
      membership: req.body.membership,
      paymentResult: req.body.paymentResult,
      totalPrice: req.body.totalPrice,
      user: req.body.user
    });
    const createdMembershipOrder = await membershipOrder.save();
    res.status(200).send(createdMembershipOrder);

    const user = await User.findById(req.body.user);

    const msg = {
      from: process.env.MAIL_FROM,
      to: `<${user.email}>`,
      subject: `Nerdhub: Membership Order ${req.body._id} received`,
      html: mailGenerator.generate(
        shopMembershipOrderReceiptEmailTemplate(user, req.body.totalPrice)
      )
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    try {
      await sgMail.send(<any>msg);
    } catch (err) {
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Cannot send membershipOrder placement receipt email`
      );
    }

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : MembershipOrder created succesfully.`
    );
  })
);

export default router;
