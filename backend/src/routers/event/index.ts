import express from 'express';
import eventsRoute from './eventsRoute';
import createEventRoute from './createEventRoute';
import eventsCategoriesRoute from './eventsCategoriesRoute';

const eventRouter = express.Router();

eventRouter.use('/events', eventsRoute);
eventRouter.use('/events', createEventRoute);
eventRouter.use('/events', eventsCategoriesRoute);

export default eventRouter;
