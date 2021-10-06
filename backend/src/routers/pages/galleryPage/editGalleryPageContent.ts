import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import GalleryPageContent from '../../../models/galleryPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const galleryPageContent = await GalleryPageContent.findOne();

    galleryPageContent.galleryMainHeading =
      req.body.galleryMainHeading || galleryPageContent.galleryMainHeading;
    galleryPageContent.galleryBackgroundImage =
      req.body.galleryBackgroundImage ||
      galleryPageContent.galleryBackgroundImage;
    galleryPageContent.buttonColor =
      req.body.buttonColor || galleryPageContent.buttonColor;
    galleryPageContent.buttonBorderColor =
      req.body.buttonBorderColor || galleryPageContent.buttonBorderColor;
    galleryPageContent.buttonBackgroundColor =
      req.body.buttonBackgroundColor ||
      galleryPageContent.buttonBackgroundColor;

    const updatedgalleryPageContent = await galleryPageContent.save();

    res.status(200).send(updatedgalleryPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated gallery page content succesfully.`
    );
  })
);

export default router;
