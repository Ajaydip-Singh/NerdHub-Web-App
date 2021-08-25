import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Event from '../../models/eventModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const eventId = req.params.id;
    if (!eventId) {
      res.status(400).send({ message: 'Request missing event id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing event id. Required to get event.`
      );
      return;
    }

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).send({ message: 'Event Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Event Not Found. Cannot get event that does not exist.`
      );
      return;
    }

    res.status(200).send({
      _id: event._id,
      name: event.name,
      image: event._id,
      date: event.date,
      description: event.description,
      time: event.time,
      price: event.price,
      isFeaturedEvent: event.isFeaturedEvent,
      country: event.country,
      city: event.city,
      venue: event.venue,
      category: event.category,
      isActive: event.isActive,
      actualNumberOfGuests: event.actualNumberOfGuests,
      capacity: event.capacity,
      backgroundColor: event.backgroundColor
    });

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent event succesfully.`
    );
  })
);

export default router;
