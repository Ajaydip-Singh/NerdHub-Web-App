import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../../models/userModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;

    if (!userId) {
      res.status(404).send({ message: 'Request missing user Id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request failed due to missing user Id`
      );
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ message: 'User Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request failed due to user not found`
      );
      return;
    }

    res.status(200).send({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      isMember: user.isMember
    });
  })
);

export default router;
