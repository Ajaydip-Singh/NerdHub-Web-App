import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import HomePageContent from '../../../models/homePageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const homePageContent = await HomePageContent.findOne();

    homePageContent.sliderPageOneBackgroundImage =
      req.body.sliderPageOneBackgroundImage ||
      homePageContent.sliderPageOneBackgroundImage;
    homePageContent.sliderPageOneContent =
      req.body.sliderPageOneContent || homePageContent.sliderPageOneContent;
    homePageContent.sliderPageTwoBackgroundImage =
      req.body.sliderPageTwoBackgroundImage ||
      homePageContent.sliderPageTwoBackgroundImage;
    homePageContent.sliderPageTwoContent =
      req.body.sliderPageTwoContent || homePageContent.sliderPageTwoContent;
    homePageContent.sliderPageThreeBackgroundImage =
      req.body.sliderPageThreeBackgroundImage ||
      homePageContent.sliderPageThreeBackgroundImage;
    homePageContent.sliderPageTheeContent =
      req.body.sliderPageTheeContent || homePageContent.sliderPageTheeContent;
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
    homePageContent.locationFrameBorderColor =
      req.body.locationFrameBorderColor ||
      homePageContent.locationFrameBorderColor;
    homePageContent.locationFrame =
      req.body.locationFrame || homePageContent.locationFrame;

    const updatedhomePageContent = await homePageContent.save();

    res.status(200).send(updatedhomePageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated homePageContent succesfully.`
    );
  })
);

export default router;
