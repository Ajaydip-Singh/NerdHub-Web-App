import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import CartPageContent from '../../../models/cartPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const cartPageContent = await CartPageContent.findOne();

    cartPageContent.cartMainHeading =
      req.body.cartMainHeading || cartPageContent.cartMainHeading;
    cartPageContent.cartBackgroundImage =
      req.body.cartBackgroundImage || cartPageContent.cartBackgroundImage;
    cartPageContent.productCardBorderColor =
      req.body.productCardBorderColor || cartPageContent.productCardBorderColor;
    cartPageContent.productCardBackgroundColor =
      req.body.productCardBackgroundColor ||
      cartPageContent.productCardBackgroundColor;
    cartPageContent.productImageBorderColor =
      req.body.productImageBorderColor ||
      cartPageContent.productImageBorderColor;
    cartPageContent.productNameColor =
      req.body.productNameColor || cartPageContent.productNameColor;
    cartPageContent.productNameActiveColor =
      req.body.productNameActiveColor || cartPageContent.productNameActiveColor;
    cartPageContent.productPriceColor =
      req.body.productPriceColor || cartPageContent.productPriceColor;

    const updatedcartPageContent = await cartPageContent.save();

    res.status(200).send(updatedcartPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated cart page content succesfully.`
    );
  })
);

export default router;
