import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/categories',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const categories = await Product.find({}).distinct('category');
    if (categories) {
      res.status(200).send(categories);
    } else {
      res.status(404).send({ message: 'No Categories Found' });
    }
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent product categories.`
    );
  })
);

export default router;
