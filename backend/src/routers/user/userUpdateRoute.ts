import express, { Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { GetUserAuthInfoRequest } from '../../interfaces/express';
import User from '../../models/userModel';
import { isAuth } from '../../utils/general';
import logger from '../../utils/logger';
import generateToken from '../../utils/jwt';

const saltRounds = 10;

const router = express.Router();

router.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req: GetUserAuthInfoRequest, res: Response) => {
    const userId = req.params.id;

    if (!userId) {
      res.status(404).send({ message: 'Request missing user Id' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request failed due to missing user Id`
      );
      return;
    }

    const body = req.body;
    if (!body) {
      res.status(404).send({ message: 'Request missing user information' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request failed due to missing user information`
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

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.phone = req.body.phone || '';

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    const updatedUser = await user.save();

    res.status(200).send({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser)
    });
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request success. Updated user.`
    );
  })
);

export default router;
