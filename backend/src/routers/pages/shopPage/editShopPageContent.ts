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
    shopPageContent.searchBarBorderColor =
      req.body.searchBarBorderColor || shopPageContent.searchBarBorderColor;
    shopPageContent.searchBarInputBackgroundColor =
      req.body.searchBarInputBackgroundColor ||
      shopPageContent.searchBarInputBackgroundColor;
    shopPageContent.searchBarInputPlaceholderColor =
      req.body.searchBarInputPlaceholderColor ||
      shopPageContent.searchBarInputPlaceholderColor;
    shopPageContent.searchBarInputTextColor =
      req.body.searchBarInputTextColor ||
      shopPageContent.searchBarInputTextColor;
    shopPageContent.searchBarIconColor =
      req.body.searchBarIconColor || shopPageContent.searchBarIconColor;
    shopPageContent.searchBarIconBackgroundColor =
      req.body.searchBarIconBackgroundColor ||
      shopPageContent.searchBarIconBackgroundColor;
    shopPageContent.searchBarIconBorderColor =
      req.body.searchBarIconBorderColor ||
      shopPageContent.searchBarIconBorderColor;
    shopPageContent.searchBarButtonColor =
      req.body.searchBarButtonColor || shopPageContent.searchBarButtonColor;
    shopPageContent.searchBarButtonBorderColor =
      req.body.searchBarButtonBorderColor ||
      shopPageContent.searchBarButtonBorderColor;
    shopPageContent.searchBarButtonBackgroundColor =
      req.body.searchBarButtonBackgroundColor ||
      shopPageContent.searchBarButtonBackgroundColor;

    const updatedShopPageContent = await shopPageContent.save();

    res.status(200).send(updatedShopPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated shop page content succesfully.`
    );
  })
);

export default router;
