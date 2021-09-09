import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel';
import { isAdmin, isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    if (!productId) {
      res.status(400).send({ message: 'Request missing product id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing product id. Required to delete product.`
      );
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).send({ message: 'Product Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Product Not Found. Cannot delete product that does not exist.`
      );
      return;
    }

    const deletedproduct = await product.remove();
    res.status(200).send(deletedproduct);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Deleted product succesfully.`
    );
  })
);

export default router;
