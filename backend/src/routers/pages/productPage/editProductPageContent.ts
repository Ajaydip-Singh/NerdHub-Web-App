import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ProductPageContent from '../../../models/productPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const productPageContent = await ProductPageContent.findOne();

    productPageContent.backgroundImage =
      req.body.backgroundImage || productPageContent.backgroundImage;
    productPageContent.productImageBorderColor =
      req.body.productImageBorderColor ||
      productPageContent.productImageBorderColor;
    productPageContent.tableBorderColor =
      req.body.tableBorderColor || productPageContent.tableBorderColor;
    productPageContent.tableEvenRowBackgroundColor =
      req.body.tableEvenRowBackgroundColor ||
      productPageContent.tableEvenRowBackgroundColor;
    productPageContent.tableEvenRowTextColor =
      req.body.tableEvenRowTextColor ||
      productPageContent.tableEvenRowTextColor;
    productPageContent.tableOddRowBackgroundColor =
      req.body.tableOddRowBackgroundColor ||
      productPageContent.tableOddRowBackgroundColor;
    productPageContent.tableOddRowTextColor =
      req.body.tableOddRowTextColor || productPageContent.tableOddRowTextColor;
    productPageContent.checkoutButtonTextColor =
      req.body.checkoutButtonTextColor ||
      productPageContent.checkoutButtonTextColor;
    productPageContent.checkoutButtonBackgroundColor =
      req.body.checkoutButtonBackgroundColor ||
      productPageContent.checkoutButtonBackgroundColor;
    productPageContent.checkoutButtonBorderColor =
      req.body.checkoutButtonBorderColor ||
      productPageContent.checkoutButtonBorderColor;

    const updatedProductPageContent = await productPageContent.save();

    res.status(200).send(updatedProductPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated product page content succesfully.`
    );
  })
);

export default router;
