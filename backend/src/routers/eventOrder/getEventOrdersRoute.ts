import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import EventOrder from '../../models/eventOrderModel';
import { isAdmin, isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const pageSize = 5;
    const pageNumber = Number(req.query.pageNumber) || 1;

    const count = await EventOrder.count({}).populate('user', 'email');
    const eventOrders = await EventOrder.find({})
      .populate('user', 'email')
      .sort({ _id: -1 })
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
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Event Orders Not Found`
      );
    }
  })
);

export default router;
