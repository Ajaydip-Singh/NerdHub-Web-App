import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import EventPageContent from '../../../models/eventPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const eventPageContent = await EventPageContent.findOne();
    res.send(eventPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Event page content sent succesfully.`
    );
  })
);

export default router;
