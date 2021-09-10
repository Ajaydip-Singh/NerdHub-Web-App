import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/brands',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const categories = await Product.find({}).distinct('brand');
    if (categories) {
      res.status(200).send(categories);
    } else {
      res.status(404).send({ message: 'No Brands Found' });
    }
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent product brands.`
    );
  })
);

export default router;
