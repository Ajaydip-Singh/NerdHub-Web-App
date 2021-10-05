import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import EventPageContent from '../../../models/eventPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const eventPageContent = await EventPageContent.findOne();

    eventPageContent.backgroundImage =
      req.body.backgroundImage || eventPageContent.backgroundImage;
    eventPageContent.comingSoon =
      req.body.comingSoon || eventPageContent.comingSoon;
    eventPageContent.comingSoonText =
      req.body.comingSoonText || eventPageContent.comingSoonText;
    eventPageContent.searchBarBorderColor =
      req.body.searchBarBorderColor || eventPageContent.searchBarBorderColor;
    eventPageContent.searchBarInputBackgroundColor =
      req.body.searchBarInputBackgroundColor ||
      eventPageContent.searchBarInputBackgroundColor;
    eventPageContent.searchBarInputPlaceholderColor =
      req.body.searchBarInputPlaceholderColor ||
      eventPageContent.searchBarInputPlaceholderColor;
    eventPageContent.searchBarInputTextColor =
      req.body.searchBarInputTextColor ||
      eventPageContent.searchBarInputTextColor;
    eventPageContent.searchBarIconColor =
      req.body.searchBarIconColor || eventPageContent.searchBarIconColor;
    eventPageContent.searchBarIconBackgroundColor =
      req.body.searchBarIconBackgroundColor ||
      eventPageContent.searchBarIconBackgroundColor;
    eventPageContent.searchBarIconBorderColor =
      req.body.searchBarIconBorderColor ||
      eventPageContent.searchBarIconBorderColor;
    eventPageContent.searchBarButtonColor =
      req.body.searchBarButtonColor || eventPageContent.searchBarButtonColor;
    eventPageContent.searchBarButtonBorderColor =
      req.body.searchBarButtonBorderColor ||
      eventPageContent.searchBarButtonBorderColor;
    eventPageContent.searchBarButtonBackgroundColor =
      req.body.searchBarButtonBackgroundColor ||
      eventPageContent.searchBarButtonBackgroundColor;

    const updatedEventPageContent = await eventPageContent.save();

    res.status(200).send(updatedEventPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated event page content succesfully.`
    );
  })
);

export default router;
