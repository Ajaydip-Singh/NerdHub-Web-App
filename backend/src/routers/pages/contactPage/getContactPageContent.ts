import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import ContactPageContent from '../../../models/contactPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const contactPageContent = await ContactPageContent.findOne();
    res.send(contactPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Contact page content sent succesfully.`
    );
  })
);

export default router;
