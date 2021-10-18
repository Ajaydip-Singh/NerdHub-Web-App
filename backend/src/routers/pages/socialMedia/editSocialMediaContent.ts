import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import SocialMedia from '../../../models/socialMediaModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const socialMedia = await SocialMedia.findOne();

    socialMedia.facebookEnabled =
      req.body.facebookEnabled || socialMedia.facebookEnabled;
    socialMedia.facebookLink =
      req.body.facebookLink || socialMedia.facebookLink;
    socialMedia.instagramEnabled =
      req.body.instagramEnabled || socialMedia.instagramEnabled;
    socialMedia.instagramLink =
      req.body.instagramLink || socialMedia.instagramLink;
    socialMedia.twitterEnabled =
      req.body.twitterEnabled || socialMedia.twitterEnabled;
    socialMedia.twitterLink = req.body.twitterLink || socialMedia.twitterLink;
    socialMedia.youtubeEnabled =
      req.body.youtubeEnabled || socialMedia.youtubeEnabled;
    socialMedia.youtubeLink = req.body.youtubeLink || socialMedia.youtubeLink;
    socialMedia.tiktokEnabled =
      req.body.tiktokEnabled || socialMedia.tiktokEnabled;
    socialMedia.tiktokLink = req.body.tiktokLink || socialMedia.tiktokLink;

    const updatedSocialMedia = await socialMedia.save();

    res.status(200).send(updatedSocialMedia);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated socialMedia content succesfully.`
    );
  })
);

export default router;
