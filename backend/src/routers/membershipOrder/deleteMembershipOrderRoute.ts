import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import MembershipOrder from '../../models/membershipOrderModel';
import { isAdmin, isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const membershipOrderId = req.params.id;
    if (!membershipOrderId) {
      res
        .status(400)
        .send({ message: 'Request missing membership order id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing membership order id. Required to delete membershipOrder.`
      );
      return;
    }

    const membershipOrder = await MembershipOrder.findById(membershipOrderId);
    if (!membershipOrder) {
      res.status(404).send({ message: 'Membership Order Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Membership Order Not Found. Cannot delete membership order that does not exist.`
      );
      return;
    }

    const deletedMembershipOrder = await membershipOrder.remove();
    res.status(200).send(deletedMembershipOrder);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Deleted membership order succesfully.`
    );
  })
);

export default router;
