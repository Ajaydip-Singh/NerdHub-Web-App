import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../../../utils/general';
import logger from '../../../utils/logger';

const router = express.Router();

router.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const body = req;
    console.log(body);

    // res.send(body);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Uploaded image succesfully.`
    );
  })
);

export default router;
