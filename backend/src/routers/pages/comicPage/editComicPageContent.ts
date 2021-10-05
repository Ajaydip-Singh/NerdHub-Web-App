import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ComicPageContent from '../../../models/comicPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const comicPageContent = await ComicPageContent.findOne();

    comicPageContent.backgroundImage =
      req.body.backgroundImage || comicPageContent.backgroundImage;
    comicPageContent.comingSoon =
      req.body.comingSoon || comicPageContent.comingSoon;
    comicPageContent.comingSoonText =
      req.body.comingSoonText || comicPageContent.comingSoonText;
    comicPageContent.searchBarBorderColor =
      req.body.searchBarBorderColor || comicPageContent.searchBarBorderColor;
    comicPageContent.searchBarInputBackgroundColor =
      req.body.searchBarInputBackgroundColor ||
      comicPageContent.searchBarInputBackgroundColor;
    comicPageContent.searchBarInputPlaceholderColor =
      req.body.searchBarInputPlaceholderColor ||
      comicPageContent.searchBarInputPlaceholderColor;
    comicPageContent.searchBarInputTextColor =
      req.body.searchBarInputTextColor ||
      comicPageContent.searchBarInputTextColor;
    comicPageContent.searchBarIconColor =
      req.body.searchBarIconColor || comicPageContent.searchBarIconColor;
    comicPageContent.searchBarIconBackgroundColor =
      req.body.searchBarIconBackgroundColor ||
      comicPageContent.searchBarIconBackgroundColor;
    comicPageContent.searchBarIconBorderColor =
      req.body.searchBarIconBorderColor ||
      comicPageContent.searchBarIconBorderColor;
    comicPageContent.searchBarButtonColor =
      req.body.searchBarButtonColor || comicPageContent.searchBarButtonColor;
    comicPageContent.searchBarButtonBorderColor =
      req.body.searchBarButtonBorderColor ||
      comicPageContent.searchBarButtonBorderColor;
    comicPageContent.searchBarButtonBackgroundColor =
      req.body.searchBarButtonBackgroundColor ||
      comicPageContent.searchBarButtonBackgroundColor;

    const updatedComicPageContent = await comicPageContent.save();

    res.status(200).send(updatedComicPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated comic page content succesfully.`
    );
  })
);

export default router;
