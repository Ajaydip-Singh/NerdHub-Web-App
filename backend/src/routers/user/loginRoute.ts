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
      res.status(400).send({ message: 'Please fill all inputs correctly.' });
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
    const passwordsMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordsMatch) {
      res.status(401).send({ message: 'Incorrect password' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : User log in failed due to incorrect password`
      );
      return;
    }

    // Check if user has verified email
    if (user.isEmailVerified) {
      res.status(200).send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user)
      });

      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : User logged in`
      );
    } else {
      res.status(401).send({ message: 'Please Verify Email and Try Again' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : User log in failed due to unverified email`
      );
      return;
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
        firstName: oldUser.firstName,
        lastName: oldUser.lastName,
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
      oldUser.isEmailVerified = true; // if signing in with google then email is verified
      const updatedUser = await oldUser.save();
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

    const user = new User({
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      email: userInfo.email,
      isEmailVerified: true,
      password: encryptedPassword,
      isGoogle: true
    });

    const createdUser = await user.save();

    res.status(200).send({
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      phone: createdUser.phone,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser)
    });
    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Created new user with google`
    );
  })
);

export default router;
