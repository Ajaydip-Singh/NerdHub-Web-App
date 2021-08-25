import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Event from '../../models/eventModel';
import { isAdmin, isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const eventId = req.params.id;
    if (!eventId) {
      res.status(400).send({ message: 'Request missing event id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing event id. Required to delete event.`
      );
      return;
    }

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).send({ message: 'Event Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Event Not Found. Cannot delete event that does not exist.`
      );
      return;
    }

    const deletedEvent = await event.remove();
    res.status(200).send({
      _id: deletedEvent._id,
      name: deletedEvent.name,
      image: deletedEvent._id,
      date: deletedEvent.date,
      description: deletedEvent.description,
      time: deletedEvent.time,
      price: deletedEvent.price,
      isFeaturedEvent: deletedEvent.isFeaturedEvent,
      country: deletedEvent.country,
      city: deletedEvent.city,
      venue: deletedEvent.venue,
      category: deletedEvent.category,
      isActive: deletedEvent.isActive,
      actualNumberOfGuests: deletedEvent.actualNumberOfGuests,
      capacity: deletedEvent.capacity,
      backgroundColor: event.backgroundColor,
      borderColor: event.borderColor
    });

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Deleted event succesfully.`
    );
  })
);

export default router;
