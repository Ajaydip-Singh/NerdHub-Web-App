import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Event from '../../models/eventModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    // handle expected query parameters
    const name = req.query.name || '';
    const category = req.query.category || '';
    const venue = req.query.venue || '';

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = category ? { category } : '';
    const venueFilter = venue ? { venue } : '';

    const events = await Event.find({
      ...nameFilter,
      ...categoryFilter,
      ...venueFilter
    });

    if (events.length !== 0) {
      res.status(200).send(events);
      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent events.`
      );
    } else {
      res.status(404).send({ message: 'Events Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : No events found.`
      );
    }
  })
);

export default router;
