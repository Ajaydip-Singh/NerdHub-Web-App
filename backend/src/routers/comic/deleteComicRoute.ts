import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Comic from '../../models/comicModel';
import { isAdmin, isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const comicId = req.params.id;
    if (!comicId) {
      res.status(400).send({ message: 'Request missing comic id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing comic id. Required to delete comic.`
      );
      return;
    }

    const comic = await Comic.findById(comicId);
    if (!comic) {
      res.status(404).send({ message: 'Comic Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Comic Not Found. Cannot delete comic that does not exist.`
      );
      return;
    }

    const deletedComic = await comic.remove();
    res.status(200).send(deletedComic);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Deleted comic succesfully.`
    );
  })
);

export default router;
