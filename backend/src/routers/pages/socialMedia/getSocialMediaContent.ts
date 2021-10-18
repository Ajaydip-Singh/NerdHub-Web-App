import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import SocialMedia from '../../../models/socialMediaModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const socialMedia = await SocialMedia.findOne();
    res.send(socialMedia);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : SocialMedia content sent succesfully.`
    );
  })
);

export default router;
