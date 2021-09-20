import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Gallery from '../../models/galleryModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/tags',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const tags = await Gallery.find({}).distinct('tag');
    if (tags) {
      res.status(200).send(tags);
    } else {
      res.status(404).send({ message: 'No Tags Found' });
    }
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent gallery tags.`
    );
  })
);

export default router;
