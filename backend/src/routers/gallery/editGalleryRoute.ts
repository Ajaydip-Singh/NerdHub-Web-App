import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Gallery from '../../models/galleryModel';
import logger from '../../utils/logger';

const router = express.Router();

router.put(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const galleryId = req.params.id;
    if (!galleryId) {
      res.status(400).send({ message: 'Request missing gallery id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing gallery id. Required to edit gallery.`
      );
      return;
    }

    const gallery = await Gallery.findById(galleryId);
    if (!gallery) {
      res.status(404).send({ message: 'Gallery Item Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Gallery Item Not Found. Cannot edit gallery that does not exist.`
      );
      return;
    }

    gallery.name = req.body.name || gallery.name;
    gallery.imageBorderColor =
      req.body.imageBorderColor || gallery.imageBorderColor;
    gallery.description = req.body.description || gallery.description;
    gallery.descriptionBackgroundColor =
      req.body.descriptionBackgroundColor || gallery.descriptionBackgroundColor;

    const updatedGallery = await gallery.save();

    res.status(200).send(updatedGallery);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated gallery item succesfully.`
    );
  })
);

export default router;
