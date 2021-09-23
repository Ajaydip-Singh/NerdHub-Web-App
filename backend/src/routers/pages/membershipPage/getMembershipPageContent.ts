import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import MembershipPageContent from '../../../models/membershipPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const membershipPageContent = await MembershipPageContent.findOne();
    res.send(membershipPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Membership page content sent succesfully.`
    );
  })
);

export default router;
