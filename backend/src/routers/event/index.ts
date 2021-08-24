import express from 'express';
import eventsRoute from './eventsRoute';
import createEventRoute from './createEventRoute';
import eventsCategoriesRoute from './eventsCategoriesRoute';
import eventsVenuesRoute from './eventsVenuesRoute';
import deleteEventRoute from './deleteEventRoute';
import getEventRoute from './getEventRoute';

const eventRouter = express.Router();

eventRouter.use('/events', eventsRoute);
eventRouter.use('/events', createEventRoute);
eventRouter.use('/events', eventsCategoriesRoute);
eventRouter.use('/events', eventsVenuesRoute);
eventRouter.use('/events', deleteEventRoute);
eventRouter.use('/events', getEventRoute);

export default eventRouter;
