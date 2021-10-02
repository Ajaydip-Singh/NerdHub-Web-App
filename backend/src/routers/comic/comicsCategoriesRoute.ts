import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Comic from '../../models/comicModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/categories',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const categories = await Comic.find({}).distinct('category');
    res.status(200).send(categories);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent comic categories.`
    );
  })
);

export default router;
