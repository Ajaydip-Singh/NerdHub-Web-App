import express from 'express';
import eventsRoute from './eventsRoute';

const eventRouter = express.Router();

eventRouter.use('/events', eventsRoute);

export default eventRouter;
