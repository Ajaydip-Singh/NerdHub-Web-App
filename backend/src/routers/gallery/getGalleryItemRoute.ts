import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Gallery from '../../models/galleryModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const galleryId = req.params.id;
    if (!galleryId) {
      res.status(400).send({ message: 'Request missing gallery item id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing gallery id. Required to get gallery.`
      );
      return;
    }

    const gallery = await Gallery.findById(galleryId);
    if (!gallery) {
      res.status(404).send({ message: 'Gallery Item Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Gallery Item Not Found. Cannot get gallery that does not exist.`
      );
      return;
    }

    res.status(200).send(gallery);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent gallery item succesfully.`
    );
  })
);

export default router;
