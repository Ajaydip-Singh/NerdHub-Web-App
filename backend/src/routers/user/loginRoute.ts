import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../../models/userModel';
import logger from '../../utils/logger';
import generateToken from '../../utils/jwt';

const router = express.Router();

router.post(
  '/login',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const body = req.body;

    if (!(body.email && body.password)) {
      res.status(400).send({ message: 'Please fill all required inputs.' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request does not contain all required body fields`
      );
      return;
    }

    // Check if user exists
    const user = await User.findOne({ email: body.email });

    // If there is no user, send error
    if (!user) {
      res
        .status(404)
        .send({ message: 'User does not exist. Please register.' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : User Already Exists`
      );
      return;
    }

    // Validate if passwords match
    if (await bcrypt.compare(body.password, user.password)) {
      res.status(200).send({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user)
      });

      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : User logged in`
      );
    } else {
      res.status(401).send({ message: 'Incorrect password' });

      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : User log in failed due to incorrect password`
      );
    }
  })
);

export default router;
