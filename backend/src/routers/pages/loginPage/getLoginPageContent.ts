import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import LoginPageContent from '../../../models/loginPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const loginPageContent = await LoginPageContent.findOne();
    res.send(loginPageContent);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Login Page content sent succesfully.`
    );
  })
);

export default router;
