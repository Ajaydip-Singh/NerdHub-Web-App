import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Event from '../../models/eventModel';
import logger from '../../utils/logger';

const router = express.Router();

router.put(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const eventId = req.params.id;
    if (!eventId) {
      res.status(400).send({ message: 'Request missing event id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing event id. Required to edit event.`
      );
      return;
    }

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).send({ message: 'Event Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Event Not Found. Cannot edit event that does not exist.`
      );
      return;
    }

    event.name = req.body.name || event.name;
    event.thumbnailImage = req.body.thumbnailImage || event.thumbnailImage;
    event.date = req.body.date || event.date;
    event.description = req.body.description || event.description;
    event.time = req.body.time || event.time;
    event.price = req.body.price || event.price;
    event.taxPrice = req.body.taxPrice || event.taxPrice;
    event.isFeaturedEvent = req.body.isFeaturedEvent || event.isFeaturedEvent;
    event.country = req.body.country || event.country;
    event.city = req.body.city || event.city;
    event.venue = req.body.venue || event.venue;
    event.category = req.body.category || event.category;
    event.isActive = req.body.isActive || event.isActive;
    event.actualNumberOfGuests =
      req.body.actualNumberOfGuests || event.actualNumberOfGuests;
    event.capacity = req.body.capacity || event.capacity;
    event.backgroundColor = req.body.backgroundColor || event.backgroundColor;
    event.borderColor = req.body.borderColor || event.borderColor;

    const updatedEvent = await event.save();

    res.status(200).send({
      _id: updatedEvent._id,
      name: updatedEvent.name,
      thumbnailImage: updatedEvent._id,
      date: updatedEvent.date,
      description: updatedEvent.description,
      time: updatedEvent.time,
      price: updatedEvent.price,
      taxPrice: updatedEvent.taxPrice,
      isFeaturedEvent: updatedEvent.isFeaturedEvent,
      country: updatedEvent.country,
      city: updatedEvent.city,
      venue: updatedEvent.venue,
      category: updatedEvent.category,
      isActive: updatedEvent.isActive,
      actualNumberOfGuests: updatedEvent.actualNumberOfGuests,
      capacity: updatedEvent.capacity,
      backgroundColor: event.backgroundColor,
      borderColor: event.borderColor
    });

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated event succesfully.`
    );
  })
);

export default router;
