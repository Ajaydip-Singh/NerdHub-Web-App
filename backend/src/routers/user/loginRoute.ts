import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import generator from 'generate-password';
import User from '../../models/userModel';
import logger from '../../utils/logger';
import generateToken from '../../utils/jwt';
import jwt_decode from 'jwt-decode';

const saltRounds = 10;

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

router.post(
  '/login/google',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const body = req.body;

    if (!body.token) {
      res.status(400).send({ message: 'Missing Google Auth Token' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Google Token not in request body`
      );
      return;
    }

    // Decode the jwt token
    const userInfo: any = jwt_decode(req.body.token.credential);

    // Check if user signed in with google before
    const oldUser = await User.findOne({ email: userInfo.email });

    // If user had signed in with google previously
    if (oldUser && oldUser.isGoogle) {
      res.status(200).send({
        _id: oldUser._id,
        first_name: oldUser.first_name,
        last_name: oldUser.last_name,
        email: oldUser.email,
        phone: oldUser.phone,
        isAdmin: oldUser.isAdmin,
        token: generateToken(oldUser)
      });
      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : User logged in via google`
      );
      return;
    } else if (oldUser && !oldUser.isGoogle) {
      oldUser.isGoogle = true;
      const updatedUser = await oldUser.save();
      res.status(200).send({
        _id: updatedUser._id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser)
      });
      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : User logged in and change log in method to google`
      );
      return;
    }

    // Code for creating new user with google

    // Generate password for user signing up with google
    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true
    });

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = new User({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      password: encryptedPassword,
      isGoogle: true
    });

    res.status(200).send({
      _id: createdUser._id,
      first_name: createdUser.first_name,
      last_name: createdUser.last_name,
      email: createdUser.email,
      phone: createdUser.phone,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser)
    });
    // res.status(200).send(decoded);
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Created new user with google`
    );
  })
);

export default router;
