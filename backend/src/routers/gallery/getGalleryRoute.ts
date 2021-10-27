import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Gallery from '../../models/galleryModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const pageSize = 16;
    const pageNumber = Number(req.query.pageNumber) || 1;

    const tag = req.query.tag || '';

    const tagFilter = tag ? { tags: tag } : {};

    const count = await Gallery.countDocuments({
      ...tagFilter
    });

    const gallery = await Gallery.find({
      ...tagFilter
    })
      .sort({ _id: -1 })
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize);

    if (gallery.length !== 0) {
      res.send({ gallery, pageNumber, pages: Math.ceil(count / pageSize) });
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
