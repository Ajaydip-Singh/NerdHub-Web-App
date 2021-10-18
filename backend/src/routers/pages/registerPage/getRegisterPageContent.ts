import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import RegisterPageContent from '../../../models/registerPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const registerPageContent = await RegisterPageContent.findOne();
    res.send(registerPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Register Page content sent succesfully.`
    );
  })
);

export default router;
