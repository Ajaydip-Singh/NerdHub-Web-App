import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import OrderPageContent from '../../../models/orderPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orderPageContent = await OrderPageContent.findOne();
    res.send(orderPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Order page content sent succesfully.`
    );
  })
);

export default router;
