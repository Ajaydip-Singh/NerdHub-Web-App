import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../../../utils/general';
import logger from '../../../utils/logger';
import { multerUploads } from '../../../utils/upload';

const router = express.Router();

router.post(
  '/',
  isAuth,
  isAdmin,
  multerUploads,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const file = req.file;

    res.send(file);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Uploaded image succesfully.`
    );
  })
);

export default router;
