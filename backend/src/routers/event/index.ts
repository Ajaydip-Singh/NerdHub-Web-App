import express from 'express';
import eventsRoute from './eventsRoute';
import createEventRoute from './createEventRoute';

const eventRouter = express.Router();

eventRouter.use('/events', eventsRoute);
eventRouter.use('/events', createEventRoute);

export default eventRouter;
