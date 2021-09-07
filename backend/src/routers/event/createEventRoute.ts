import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Event from '../../models/eventModel';
import { isAuth, isAdmin } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const event = new Event({
      name: 'Sample Event' + Date.now(),
      thumbnailImage: '/thumbnailImages/call_of_duty_ghosts.jpeg',
      date: Date.now(),
      description: 'Sample Event Description',
      time: '14:00 PM - 16:00 PM',
      venue: 'Sample Venue',
      category: 'Sample Event',
      backgroundColor: '#50d450',
      borderColor: '#50d450'
    });

    const createdEvent = await event.save();

    res.send({
      _id: createdEvent._id,
      name: createdEvent.name,
      thumbnailImage: createdEvent._id,
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
      capacity: createdEvent.capacity,
      backgroundColor: event.backgroundColor,
      borderColor: event.borderColor
    });

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Created new event succesfully.`
    );
  })
);

export default router;
