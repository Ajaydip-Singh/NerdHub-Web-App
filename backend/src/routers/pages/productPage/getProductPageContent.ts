import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ProductPageContent from '../../../models/productPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const productPageContent = await ProductPageContent.findOne();
    res.send(productPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Product page content sent succesfully.`
    );
  })
);

export default router;
