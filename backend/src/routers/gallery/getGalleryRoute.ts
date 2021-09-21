import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Gallery from '../../models/galleryModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const tag = req.query.tag || '';

    const tagFilter = tag ? { tags: tag } : {};
    const gallery = await Gallery.find({
      ...tagFilter
    });

    if (gallery.length !== 0) {
      res.send(gallery);
      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Gallery sent succesfully`
      );
    } else {
      res.status(404).send({ message: 'Gallery Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Gallery Not Found`
      );
    }
  })
);

export default router;
