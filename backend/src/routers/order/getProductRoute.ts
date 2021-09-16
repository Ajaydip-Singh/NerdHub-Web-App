import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    if (!productId) {
      res.status(400).send({ message: 'Request missing product id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing product id. Required to get product.`
      );
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).send({ message: 'Product Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Product Not Found. Cannot get product that does not exist.`
      );
      return;
    }

    res.status(200).send(product);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent product succesfully.`
    );
  })
);

export default router;
