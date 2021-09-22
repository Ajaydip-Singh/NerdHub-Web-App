import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { cloudinaryConfig } from '../../config/cloudinaryConfig';
import Gallery from '../../models/galleryModel';
import { isAdmin, isAuth } from '../../utils/general';
import logger from '../../utils/logger';
import cloudinary from 'cloudinary';

const router = express.Router();

router.delete(
  '/:publicId',
  cloudinaryConfig,
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const galleryItemPublicId = req.params.publicId;
    if (!galleryItemPublicId) {
      res
        .status(400)
        .send({ message: 'Request missing gallery item publicId' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing gallery item publicId. Required to delete gallery.`
      );
      return;
    }

    const galleryItem = await Gallery.findOne({
      publicId: galleryItemPublicId
    });
    if (!galleryItem) {
      res.status(404).send({ message: 'Gallery Item Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Gallery item Not Found. Cannot delete gallery that does not exist.`
      );
      return;
    }

    try {
      await cloudinary.v2.api.delete_resources([galleryItemPublicId]);
    } catch (err) {
      res.status(500).send({ message: err });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Gallery item Not Deleted in Host`
      );
      return;
    }

    const deletedgalleryItem = await galleryItem.remove();

    res.status(200).send(deletedgalleryItem);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Deleted gallery item succesfully.`
    );
  })
);

export default router;
