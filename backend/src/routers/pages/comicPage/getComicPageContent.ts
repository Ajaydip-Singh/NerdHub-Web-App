import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ComicPageContent from '../../../models/comicPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const comicPageContent = await ComicPageContent.findOne();
    res.send(comicPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Comic page content sent succesfully.`
    );
  })
);

export default router;
