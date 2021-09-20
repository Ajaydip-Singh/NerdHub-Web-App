import express, { Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../../../utils/general';
import logger from '../../../utils/logger';
import { multerMultipleUpload, multipleDataUri } from '../../../utils/upload';
import { cloudinaryConfig, uploader } from '../../../config/cloudinaryConfig';
import { FileRequest } from '../../../interfaces/express';
import Gallery from '../../../models/galleryModel';

const router = express.Router();

router.post(
  '/multiple',
  isAuth,
  isAdmin,
  multerMultipleUpload,
  cloudinaryConfig,
  expressAsyncHandler(async (req: FileRequest, res: Response) => {
    if (req.files) {
      const files = multipleDataUri(req);

      // get any tags to categorize images
      const tags = req.query.tags || '';

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const uploadPromises = files.map((file) =>
        uploader.upload(file, {
          overwrite: false,
          unique_filename: false,
          tags
        })
      );

      try {
        const imageResponses = await Promise.all(uploadPromises);

        // Check if images were uploaded for gallery
        if (req.query.gallery) {
          const galleryImages = imageResponses.map((response) => {
            return { url: response.url, tags: response.tags };
          });
          await Gallery.insertMany(galleryImages);
        }

        res.send(imageResponses);

        logger.info(
          `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Uploaded image succesfully.`
        );
        return;
      } catch (err) {
        res.status(404).send({ message: err });
      }
    } else {
      res.status(404).send({ message: 'Request missing files' });
    }

    logger.error(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Image upload not succesfull.`
    );
  })
);

export default router;
