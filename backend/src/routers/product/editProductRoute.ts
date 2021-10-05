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

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).send({ message: 'Product Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Product Not Found. Cannot edit product that does not exist.`
      );
      return;
    }

    product.cardName = req.body.cardName || product.cardName;
    product.pageName = req.body.pageName || product.pageName;
    product.thumbnailImage = req.body.thumbnailImage || product.thumbnailImage;
    product.images = req.body.images || product.images;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.taxPrice = req.body.taxPrice || product.taxPrice;
    product.shippingInfo = req.body.shippingInfo || product.shippingInfo;
    product.cardDisplayPrice =
      req.body.cardDisplayPrice || product.cardDisplayPrice;
    product.pageDisplayPrice =
      req.body.pageDisplayPrice || product.pageDisplayPrice;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.rating = req.body.rating || product.rating;
    product.ratingColor = req.body.ratingColor || product.ratingColor;
    product.numReviews = req.body.numReviews || product.numReviews;
    product.numReviewsColor =
      req.body.numReviewsColor || product.numReviewsColor;
    product.isCardActiveReviews =
      req.body.isCardActiveReviews || product.isCardActiveReviews;
    product.isPageActiveReviews =
      req.body.isPageActiveReviews || product.isPageActiveReviews;
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
