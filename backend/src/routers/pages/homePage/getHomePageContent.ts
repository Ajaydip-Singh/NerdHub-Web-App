import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import HomePageContent from '../../../models/homePageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const homePageContent = await HomePageContent.findOne();
    res.send(homePageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Home Page content sent succesfully.`
    );
  })
);

export default router;
