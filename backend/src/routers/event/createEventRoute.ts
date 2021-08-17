import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Event from '../../models/eventModel';
import logger from '../../utils/logger';

const router = express.Router();

router.post(
  '/',
  //   isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const body = req.body;

    if (
      !(
        body.name &&
        body.image &&
        body.date &&
        body.description &&
        body.time &&
        body.venue &&
        body.category
      )
    ) {
      res.status(400).send({ message: 'Please fill all required inputs.' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request does not contain all required body fields`
      );
    }

    const previousEvent = await Event.findOne({ name: body.name });

    if (previousEvent) {
      res.status(409).send({
        message:
          'Event Already Exists with the Specified Name. Use another name.'
      });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Event already exists with specified name.`
      );
      return;
    }

    const event = new Event({
      name: body.name,
      image: body.image,
      date: body.date,
      description: body.description,
      time: body.time,
      venue: body.venue,
      category: body.category
    });

    // handle optional attributes
    body.price && (event.price = body.price);
    body.isFeaturedEvent && (event.isFeaturedEvent = body.isFeaturedEvent);
    body.country && (event.country = body.country);
    body.city && (event.city = body.city);
    body.isActive && (event.isActive = body.isActive);
    body.actualNumberOfGuests &&
      (event.actualNumberOfGuests = body.actualNumberOfGuests);
    body.capacity && (event.capacity = body.capacity);

    const createdEvent = await event.save();

    res.status(200).send({
      _id: createdEvent._id,
      name: createdEvent.name,
      image: createdEvent._id,
      date: createdEvent.date,
      description: createdEvent.description,
      time: createdEvent.time,
      price: createdEvent.price,
      isFeaturedEvent: createdEvent.isFeaturedEvent,
      country: createdEvent.country,
      city: createdEvent.city,
      venue: createdEvent.venue,
      category: createdEvent.category,
      isActive: createdEvent.isActive,
      actualNumberOfGuests: createdEvent.actualNumberOfGuests,
      capacity: createdEvent.capacity
    });
  })
);

export default router;
