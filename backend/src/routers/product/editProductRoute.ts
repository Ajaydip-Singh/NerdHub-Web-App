import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel';
import logger from '../../utils/logger';

const router = express.Router();

router.put(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    if (!productId) {
      res.status(400).send({ message: 'Request missing product id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing product id. Required to edit product.`
      );
      return;
    }

    const product = Product.findById(productId);
    if (!product) {
      res.status(404).send({ message: 'Product Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Product Not Found. Cannot edit product that does not exist.`
      );
      return;
    }

    product.name = req.body.name || product.name;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.rating = req.body.rating || product.rating;
    product.numReviews = req.body.numReviews || product.numReviews;
    product.isActive = req.body.isActive || product.isActive;
    product.isFeaturedProduct =
      req.body.isFeaturedProduct || product.isFeaturedProduct;
    product.borderColor = req.body.borderColor || product.borderColor;
    product.borderHoverColor =
      req.body.borderHoverColor || product.borderHoverColor;
    product.backgroundColor =
      req.body.backgroundColor || product.backgroundColor;

    const updatedproduct = await product.save();

    res.status(200).send(updatedproduct);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated product succesfully.`
    );
  })
);

export default router;
