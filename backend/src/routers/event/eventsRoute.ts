import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Event from '../../models/eventModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    // handle expected query parameters
    const pageSize = 5;
    const pageNumber = Number(req.query.pageNumber) || 1;

    const name = req.query.name || '';
    const category = req.query.category || '';
    const venue = req.query.venue || '';
    const isFeaturedEvent = req.query.isFeaturedEvent || '';

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = category ? { category } : '';
    const venueFilter = venue ? { venue } : '';
    const isFeaturedFilter = isFeaturedEvent ? { isFeaturedEvent } : '';

    const count = await Event.count({
      ...nameFilter,
      ...categoryFilter,
      ...venueFilter,
      ...isFeaturedFilter
    });

    const events = await Event.find({
      ...nameFilter,
      ...categoryFilter,
      ...venueFilter,
      ...isFeaturedFilter
    })
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize);

    if (events.length !== 0) {
      res
        .status(200)
        .send({ events, pageNumber, pages: Math.ceil(count / pageSize) });
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
