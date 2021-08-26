import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import AboutPageContent from '../../../models/aboutPageModel';
import { isAdmin, isAuth } from '../../../utils/general';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const aboutPageContent = await AboutPageContent.findOne();
    res.send(aboutPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : About page content sent succesfully.`
    );
  })
);

export default router;
