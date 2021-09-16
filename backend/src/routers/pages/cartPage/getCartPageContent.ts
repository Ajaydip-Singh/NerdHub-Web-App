import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import CartPageContent from '../../../models/cartPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const cartPageContent = await CartPageContent.findOne();
    res.send(cartPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Cart page content sent succesfully.`
    );
  })
);

export default router;
