import express from 'express';
import eventsRoute from './eventsRoute';
import createEventRoute from './createEventRoute';
import eventCategoriesRoute from './eventCategoriesRoute';

const eventRouter = express.Router();

eventRouter.use('/events', eventsRoute);
eventRouter.use('/events', createEventRoute);
eventRouter.use('/events', eventCategoriesRoute);

export default eventRouter;
