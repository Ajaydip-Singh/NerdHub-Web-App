import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ShopPageContent from '../../../models/shopPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const shopPageContent = await ShopPageContent.findOne();
    res.send(shopPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Shop page content sent succesfully.`
    );
  })
);

export default router;
