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
      req.body.productCardBorderColor ||
      orderPageContent.productCardBorderColor;
    orderPageContent.productCardBackgroundColor =
      req.body.productCardBackgroundColor ||
      orderPageContent.productCardBackgroundColor;
    orderPageContent.productImageBorderColor =
      req.body.productImageBorderColor ||
      orderPageContent.productImageBorderColor;
    orderPageContent.productNameColor =
      req.body.productNameColor || orderPageContent.productNameColor;
    orderPageContent.productNameActiveColor =
      req.body.productNameActiveColor ||
      orderPageContent.productNameActiveColor;
    orderPageContent.productPriceColor =
      req.body.productPriceColor || orderPageContent.productPriceColor;
    orderPageContent.tableBorderColor =
      req.body.tableBorderColor || orderPageContent.tableBorderColor;
    orderPageContent.tableEvenRowBackgroundColor =
      req.body.tableEvenRowBackgroundColor ||
      orderPageContent.tableEvenRowBackgroundColor;
    orderPageContent.tableEvenRowTextColor =
      req.body.tableEvenRowTextColor || orderPageContent.tableEvenRowTextColor;
    orderPageContent.tableOddRowBackgroundColor =
      req.body.tableOddRowBackgroundColor ||
      orderPageContent.tableOddRowBackgroundColor;
    orderPageContent.tableOddRowTextColor =
      req.body.tableOddRowTextColor || orderPageContent.tableOddRowTextColor;
    orderPageContent.checkoutButtonTextColor =
      req.body.checkoutButtonTextColor ||
      orderPageContent.checkoutButtonTextColor;
    orderPageContent.checkoutButtonBackgroundColor =
      req.body.checkoutButtonBackgroundColor ||
      orderPageContent.checkoutButtonBackgroundColor;
    orderPageContent.checkoutButtonBorderColor =
      req.body.checkoutButtonBorderColor ||
      orderPageContent.checkoutButtonBorderColor;

    const updatedorderPageContent = await orderPageContent.save();

    res.status(200).send(updatedorderPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated order page content succesfully.`
    );
  })
);

export default router;
