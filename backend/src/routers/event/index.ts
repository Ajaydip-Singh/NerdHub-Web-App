import express from 'express';
import eventsRoute from './eventsRoute';
import createEventRoute from './createEventRoute';
import eventsCategoriesRoute from './eventsCategoriesRoute';
import eventsVenuesRoute from './eventsVenuesRoute';
import deleteEventRoute from './deleteEventRoute';

const eventRouter = express.Router();

eventRouter.use('/events', eventsRoute);
eventRouter.use('/events', createEventRoute);
eventRouter.use('/events', eventsCategoriesRoute);
eventRouter.use('/events', eventsVenuesRoute);
eventRouter.use('/events', deleteEventRoute);

export default eventRouter;
