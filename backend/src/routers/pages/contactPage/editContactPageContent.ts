import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ContactPageContent from '../../../models/contactPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const contactPageContent = await ContactPageContent.findOne();

    contactPageContent.contactMainHeading =
      req.body.contactMainHeading || contactPageContent.contactMainHeading;
    contactPageContent.contactHeroBackgroundImage =
      req.body.contactHeroBackgroundImage ||
      contactPageContent.contactHeroBackgroundImage;
    contactPageContent.contactMainBackgroundImage =
      req.body.contactMainBackgroundImage ||
      contactPageContent.contactMainBackgroundImage;
    contactPageContent.sectionOneText =
      req.body.sectionOneText || contactPageContent.sectionOneText;
    contactPageContent.sectionOneImage =
      req.body.sectionOneImage || contactPageContent.sectionOneImage;
    contactPageContent.locationFrame =
      req.body.locationFrame || contactPageContent.locationFrame;
    contactPageContent.locationFrameBorderColor =
      req.body.locationFrameBorderColor ||
      contactPageContent.locationFrameBorderColor;
    contactPageContent.locationText =
      req.body.locationText || contactPageContent.locationText;

    const updatedcontactPageContent = await contactPageContent.save();

    res.status(200).send(updatedcontactPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated contact page content succesfully.`
    );
  })
);

export default router;
