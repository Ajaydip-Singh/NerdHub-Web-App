import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import PostPaymentPageContent from '../../../models/postPaymentPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const postPaymentPageContent = await PostPaymentPageContent.findOne();

    postPaymentPageContent.backgroundImage =
      req.body.backgroundImage || postPaymentPageContent.backgroundImage;
    postPaymentPageContent.mainText =
      req.body.mainText || postPaymentPageContent.mainText;
    postPaymentPageContent.infoText =
      req.body.infoText || postPaymentPageContent.infoText;

    const updatedpostPaymentPageContent = await postPaymentPageContent.save();

    res.status(200).send(updatedpostPaymentPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated postPayment page content succesfully.`
    );
  })
);

export default router;
