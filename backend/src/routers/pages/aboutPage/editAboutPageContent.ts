import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import AboutPageContent from '../../../models/aboutPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const aboutPageContent = await AboutPageContent.findOne();

    aboutPageContent.videoHeading =
      req.body.videoHeading || aboutPageContent.videoHeading;
    aboutPageContent.videoUrl = req.body.videoUrl || aboutPageContent.videoUrl;
    aboutPageContent.videoThumbnail =
      req.body.videoThumbnail || aboutPageContent.videoThumbnail;
    aboutPageContent.videoBorderColor =
      req.body.videoBorderColor || aboutPageContent.videoBorderColor;
    aboutPageContent.eventBackgroundImage =
      req.body.videoBoxShadowColor || aboutPageContent.videoBoxShadowColor;


    aboutPageContent.videoBoxShadowColor =
      req.body.videoBoxShadowColor || aboutPageContent.videoBoxShadowColor;



    const updatedaboutPageContent = await aboutPageContent.save();

    res.status(200).send(updatedaboutPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated aboutPageContent succesfully.`
    );
  })
);

export default router;
