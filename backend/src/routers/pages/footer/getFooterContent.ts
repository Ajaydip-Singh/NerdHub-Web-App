import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Footer from '../../../models/footerModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const footer = await Footer.findOne();
    res.send(footer);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Footer content sent succesfully.`
    );
  })
);

export default router;
