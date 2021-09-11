import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel';
import { isAuth, isAdmin } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const product = new Product({
      cardName: 'Sample product card name ' + Date.now(),
      pageName: 'Sample product page name ' + Date.now(),
      image: '/images/call_of_duty_ghosts.jpeg',
      brand: 'Sample brand',
      category: 'Sample category',
      description: 'Sample description',
      price: 0,
      cardDisplayPrice: 'KES 0',
      pageDisplayPrice: 'KES 0',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      borderColor: '#fff',
      borderHoverColor: '#50d450',
      backgroundColor: '#000'
    });

    const createdproduct = await product.save();

    res.send(createdproduct);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Created new product succesfully.`
    );
  })
);

export default router;
