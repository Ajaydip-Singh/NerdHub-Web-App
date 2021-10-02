import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Comic from '../../models/comicModel';
import logger from '../../utils/logger';

const router = express.Router();

router.put(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const comicId = req.params.id;
    if (!comicId) {
      res.status(400).send({ message: 'Request missing comic id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing comic id. Required to edit comic.`
      );
      return;
    }

    const comic = await Comic.findById(comicId);
    if (!comic) {
      res.status(404).send({ message: 'Comic Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Comic Not Found. Cannot edit comic that does not exist.`
      );
      return;
    }

    comic.name = req.body.name || comic.name;
    comic.thumbnailImage = req.body.thumbnailImage || comic.thumbnailImage;
    comic.description = req.body.description || comic.description;
    comic.category = req.body.category || comic.category;
    comic.isActive = req.body.isActive || comic.isActive;
    comic.backgroundColor = req.body.backgroundColor || comic.backgroundColor;
    comic.borderColor = req.body.borderColor || comic.borderColor;

    const updatedComic = await comic.save();

    res.status(200).send(updatedComic);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated comic succesfully.`
    );
  })
);

export default router;
