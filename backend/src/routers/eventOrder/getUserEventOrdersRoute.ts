import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import EventOrder from '../../models/orderModel';
import { isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const pageSize = 5;
    const pageNumber = Number(req.query.pageNumber) || 1;

    const userId = req.query.userId;

    const count = await EventOrder.count({ user: userId });
    const eventOrders = await EventOrder.find({ user: userId })
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize);

    if (eventOrders.length !== 0) {
      res.send({ eventOrders, pageNumber, pages: Math.ceil(count / pageSize) });
      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Event orders sent succesfully`
      );
    } else {
      res.status(404).send({ message: 'Event orders Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Event orders Not Found`
      );
    }
  })
);

export default router;
