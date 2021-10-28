import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import OrderHistoryPageContent from '../../../models/orderHistoryPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orderHistoryPageContent = await OrderHistoryPageContent.findOne();
    res.send(orderHistoryPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Order history page content sent succesfully.`
    );
  })
);

export default router;
