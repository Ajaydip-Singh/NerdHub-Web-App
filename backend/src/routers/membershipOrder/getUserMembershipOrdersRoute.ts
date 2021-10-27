import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import MembershipOrder from '../../models/orderModel';
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

    const count = await MembershipOrder.count({ user: userId });
    const membershipOrders = await MembershipOrder.find({ user: userId })
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize);

    if (membershipOrders.length !== 0) {
      res.send({
        membershipOrders,
        pageNumber,
        pages: Math.ceil(count / pageSize)
      });
      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Membership orders sent succesfully`
      );
    } else {
      res.status(404).send({ message: 'Membership orders Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Membership orders Not Found`
      );
    }
  })
);

export default router;
