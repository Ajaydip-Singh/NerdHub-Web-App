import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import AboutPageContent from '../../../models/aboutPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const aboutPageContent = await AboutPageContent.findOne();

    aboutPageContent.aboutMainHeading =
      req.body.aboutMainHeading || aboutPageContent.aboutMainHeading;
    aboutPageContent.aboutBackgroundImage =
      req.body.aboutBackgroundImage || aboutPageContent.aboutBackgroundImage;
    aboutPageContent.videoUrl = req.body.videoUrl || aboutPageContent.videoUrl;
    aboutPageContent.videoThumbnail =
      req.body.videoThumbnail || aboutPageContent.videoThumbnail;
    aboutPageContent.videoBorderColor =
      req.body.videoBorderColor || aboutPageContent.videoBorderColor;
    aboutPageContent.videoBoxShadowColor =
      req.body.videoBoxShadowColor || aboutPageContent.videoBoxShadowColor;
    aboutPageContent.sectionOneHeading =
      req.body.sectionOneHeading || aboutPageContent.sectionOneHeading;
    aboutPageContent.sectionOneText =
      req.body.sectionOneText || aboutPageContent.sectionOneText;
    aboutPageContent.sectionOneImage =
      req.body.sectionOneImage || aboutPageContent.sectionOneImage;
    aboutPageContent.sectionTwoHeading =
      req.body.sectionTwoHeading || aboutPageContent.sectionTwoHeading;
    aboutPageContent.sectionTwoText =
      req.body.sectionTwoText || aboutPageContent.sectionTwoText;
    aboutPageContent.sectionTwoImage =
      req.body.sectionTwoImage || aboutPageContent.sectionTwoImage;

    const updatedaboutPageContent = await aboutPageContent.save();

    res.status(200).send(updatedaboutPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated about page content succesfully.`
    );
  })
);

export default router;
