import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import MembershipPageContent from '../../../models/membershipPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const membershipPageContent = await MembershipPageContent.findOne();

    membershipPageContent.membershipMainHeading =
      req.body.membershipMainHeading ||
      membershipPageContent.membershipMainHeading;
    membershipPageContent.membershipBackgroundImage =
      req.body.membershipBackgroundImage ||
      membershipPageContent.membershipBackgroundImage;
    membershipPageContent.membershipMainContent =
      req.body.membershipMainContent ||
      membershipPageContent.membershipMainContent;
    membershipPageContent.membershipFee =
      req.body.membershipFee || membershipPageContent.membershipFee;

    const updatedMembershipPageContent = await membershipPageContent.save();

    res.status(200).send(updatedMembershipPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated membership page content succesfully.`
    );
  })
);

export default router;
