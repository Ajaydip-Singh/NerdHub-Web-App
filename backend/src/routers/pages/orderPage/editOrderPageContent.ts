import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import OrderPageContent from '../../../models/orderPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orderPageContent = await OrderPageContent.findOne();

    orderPageContent.orderMainHeading =
      req.body.orderMainHeading || orderPageContent.orderMainHeading;
    orderPageContent.orderBackgroundImage =
      req.body.orderBackgroundImage || orderPageContent.orderBackgroundImage;
    orderPageContent.shippingInfoColor =
      req.body.shippingInfoColor || orderPageContent.shippingInfoColor;
    orderPageContent.productCardBorderColor =
      req.body.productCardBorderColor || orderPageContent.productCardBorderColor;
    orderPageContent.productCardBackgroundColor =
      req.body.productCardBackgroundColor ||
      orderPageContent.productCardBackgroundColor;
    orderPageContent.productImageBorderColor =
      req.body.productImageBorderColor ||
      orderPageContent.productImageBorderColor;
    orderPageContent.productNameColor =
      req.body.productNameColor || orderPageContent.productNameColor;
    orderPageContent.productNameActiveColor =
      req.body.productNameActiveColor || orderPageContent.productNameActiveColor;
    orderPageContent.productPriceColor =
      req.body.productPriceColor || orderPageContent.productPriceColor;

    const updatedorderPageContent = await orderPageContent.save();

    res.status(200).send(updatedorderPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated order page content succesfully.`
    );
  })
);

export default router;
