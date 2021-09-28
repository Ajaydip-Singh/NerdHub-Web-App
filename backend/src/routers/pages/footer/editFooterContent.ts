import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Footer from '../../../models/footerModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const footer = await Footer.findOne();

    footer.backgroundColor = req.body.backgroundColor || footer.backgroundColor;
    footer.address = req.body.address || footer.address;
    footer.emailAddress = req.body.emailAddress || footer.emailAddress;
    footer.phone = req.body.phone || footer.phone;
    footer.footerHeaderColor =
      req.body.footerHeaderColor || footer.footerHeaderColor;
    footer.footerLinkColor = req.body.footerLinkColor || footer.footerLinkColor;

    const updatedFooter = await footer.save();

    res.status(200).send(updatedFooter);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated footer content succesfully.`
    );
  })
);

export default router;
