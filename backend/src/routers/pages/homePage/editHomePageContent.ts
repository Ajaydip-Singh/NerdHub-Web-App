import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import HomePageContent from '../../../models/homePageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const homePageContent = await HomePageContent.findOne();

    homePageContent.videoHeading =
      req.body.videoHeading || homePageContent.videoHeading;
    homePageContent.videoUrl = req.body.videoUrl || homePageContent.videoUrl;
    homePageContent.videoThumbnail =
      req.body.videoThumbnail || homePageContent.videoThumbnail;
    homePageContent.videoBackgroundImage =
      req.body.videoBackgroundImage || homePageContent.videoBackgroundImage;
    homePageContent.videoBorderColor =
      req.body.videoBorderColor || homePageContent.videoBorderColor;
    homePageContent.videoBoxShadowColor =
      req.body.videoBoxShadowColor || homePageContent.videoBoxShadowColor;
    homePageContent.eventBackgroundImage =
      req.body.eventBackgroundImage || homePageContent.eventBackgroundImage;
    homePageContent.contactBackgroundColor =
      req.body.contactBackgroundColor || homePageContent.contactBackgroundColor;
    homePageContent.contactText =
      req.body.contactText || homePageContent.contactText;

    const updatedhomePageContent = await homePageContent.save();

    res.status(200).send(updatedhomePageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated homePageContent succesfully.`
    );
  })
);

export default router;
