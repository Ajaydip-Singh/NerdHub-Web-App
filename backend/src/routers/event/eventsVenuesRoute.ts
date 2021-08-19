import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Event from '../../models/eventModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/venues',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const categories = await Event.find({}).distinct('venue');
    res.status(200).send(categories);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent event venues.`
    );
  })
);

export default router;
