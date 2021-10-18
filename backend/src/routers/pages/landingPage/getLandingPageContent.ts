import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import LandingPageContent from '../../../models/landingPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const landingPageContent = await LandingPageContent.findOne();
    res.send(landingPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Landing Page content sent succesfully.`
    );
  })
);

export default router;
