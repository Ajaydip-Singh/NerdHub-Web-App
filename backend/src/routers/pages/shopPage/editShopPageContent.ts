import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ShopPageContent from '../../../models/shopPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const shopPageContent = await ShopPageContent.findOne();

    shopPageContent.backgroundImage =
      req.body.backgroundImage || shopPageContent.backgroundImage;

    shopPageContent.comingSoon =
      req.body.comingSoon || shopPageContent.comingSoon;

    shopPageContent.comingSoonText =
      req.body.comingSoonText || shopPageContent.comingSoonText;

    const updatedShopPageContent = await shopPageContent.save();

    res.status(200).send(updatedShopPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated shop page content succesfully.`
    );
  })
);

export default router;
