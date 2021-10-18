import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import LandingPageContent from '../../../models/landingPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const landingPageContent = await LandingPageContent.findOne();

    landingPageContent.showVideo =
      req.body.showVideo || landingPageContent.showVideo;
    landingPageContent.videoUrl =
      req.body.videoUrl || landingPageContent.videoUrl;
    landingPageContent.mobileVideoUrl =
      req.body.mobileVideoUrl || landingPageContent.mobileVideoUrl;

    const updatedlandingPageContent = await landingPageContent.save();

    res.status(200).send(updatedlandingPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated landingPageContent succesfully.`
    );
  })
);

export default router;
