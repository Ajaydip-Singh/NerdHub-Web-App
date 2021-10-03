import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/productModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const pageSize = 10;
    const pageNumber = Number(req.query.pageNumber) || 1;

    const name = req.query.name || '';
    const category = req.query.category || '';
    const brand = req.query.brand || '';
    const order = req.query.order || '';
    const isActive = req.query.isActive || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name
      ? { cardName: { $regex: name, $options: 'i' } }
      : {};
    const categoryFilter = category ? { category } : {};
    const brandFilter = brand ? { brand } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const isActiveFilter = isActive ? { isActive } : '';

    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: 1 };

    const count = await Product.count({
      ...nameFilter,
      ...categoryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
      ...isActiveFilter
    });

    const products = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter
    })
      .sort(sortOrder)
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize);

    if (products.length !== 0) {
      res.send({ products, pageNumber, pages: Math.ceil(count / pageSize) });
      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Products sent succesfully`
      );
    } else {
      res.status(404).send({ message: 'Products Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Products Not Found`
      );
    }
  })
);

export default router;
