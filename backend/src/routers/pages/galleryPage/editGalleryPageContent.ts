import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ContactPageContent from '../../../models/galleryPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const galleryPageContent = await ContactPageContent.findOne();

    galleryPageContent.galleryMainHeading =
      req.body.galleryMainHeading || galleryPageContent.galleryMainHeading;
    galleryPageContent.galleryBackgroundImage =
      req.body.galleryBackgroundImage ||
      galleryPageContent.galleryBackgroundImage;
    galleryPageContent.itemBorderColor =
      req.body.itemBorderColor || galleryPageContent.itemBorderColor;

    const updatedgalleryPageContent = await galleryPageContent.save();

    res.status(200).send(updatedgalleryPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated gallery page content succesfully.`
    );
  })
);

export default router;
