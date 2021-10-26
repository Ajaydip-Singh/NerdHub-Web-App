import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import EventOrder from '../../models/eventOrderModel';
import { isAdmin, isAuth } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const eventOrderId = req.params.id;
    if (!eventOrderId) {
      res.status(400).send({ message: 'Request missing event eventOrder id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request is missing event order id. Required to delete eventOrder.`
      );
      return;
    }

    const eventOrder = await EventOrder.findById(eventOrderId);
    if (!eventOrder) {
      res.status(404).send({ message: 'Event Order Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Event Order Not Found. Cannot delete event order that does not exist.`
      );
      return;
    }

    const deletedEventOrder = await eventOrder.remove();
    res.status(200).send(deletedEventOrder);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Deleted event order succesfully.`
    );
  })
);

export default router;
