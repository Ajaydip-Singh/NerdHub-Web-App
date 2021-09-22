import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import GalleryPageContent from '../../../models/galleryPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const galleryPageContent = await GalleryPageContent.findOne();
    res.send(galleryPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Gallery page content sent succesfully.`
    );
  })
);

export default router;
