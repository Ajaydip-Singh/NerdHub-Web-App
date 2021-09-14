import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../../../utils/general';
import logger from '../../../utils/logger';
import { dataUri, multerSingleUpload } from '../../../utils/upload';
import { cloudinaryConfig, uploader } from '../../../config/cloudinaryConfig';

const router = express.Router();

router.post(
  '/',
  isAuth,
  isAdmin,
  multerSingleUpload,
  cloudinaryConfig,
  expressAsyncHandler(async (req: Request, res: Response) => {
    if (req.file) {
      const file = dataUri(req).content;

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const image = await uploader.upload(file!, {
          overwrite: false,
          unique_filename: false
        });
        res.send({ image });

        logger.info(
          `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Uploaded image succesfully.`
        );
        return;
      } catch (err) {
        res.status(404).send({ message: err });
      }
    } else {
      res.status(404).send({ message: 'Request missing file' });
    }

    logger.error(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Image upload not succesfull.`
    );
  })
);

export default router;
