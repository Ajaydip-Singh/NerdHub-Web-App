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

    const updatedProductPageContent = await productPageContent.save();

    res.status(200).send(updatedProductPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated product page content succesfully.`
    );
  })
);

export default router;
