import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import PostPaymentPageContent from '../../../models/postPaymentPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const postPaymentPageContent = await PostPaymentPageContent.findOne();
    res.send(postPaymentPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Post payment page content sent succesfully.`
    );
  })
);

export default router;
