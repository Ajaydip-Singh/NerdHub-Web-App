import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../../models/userModel';
import logger from '../../utils/logger';

const router = express.Router();

router.post(
  '/:userId/confirm/:confirmationCode',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const confirmationCode = req.params.confirmationCode;
    const userId = req.params.userId;

    if (!confirmationCode) {
      res.status(400).send({ message: 'No confirmation code sent' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request does not contain confirmation code`
      );
      return;
    }

    if (!userId) {
      res.status(400).send({ message: 'No user Id in request' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request does not contain user Id`
      );
      return;
    }

    // Find user to activate
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send({ message: 'User Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : User Not Found`
      );
      return;
    }

    if (user.isEmailVerified) {
      res
        .status(200)
        .send({ message: 'Email already verified. Please login' });
      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : User is already verified. Redirecting to login page`
      );
      return;
    }

    if (user.confirmationCode === confirmationCode) {
      user.isEmailVerified = true;
      await user.save();
      res.status(200).send({ message: 'Email Verified. Please login' });
      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Verified user. Redirecting to login page`
      );
    } else {
      res.status(400).send({ message: 'Email Not Verified. Please try again' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode}  Verifying user failed. Redirecting to login page`
      );
    }
  })
);

export default router;
