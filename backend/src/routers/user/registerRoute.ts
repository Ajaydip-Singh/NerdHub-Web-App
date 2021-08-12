import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../../models/userModel';
import logger from '../../utils/logger';
import generateToken from '../../utils/jwt';
import { mailGenerator, mg } from '../../utils/mail/mail';
import { confirmEmailTemplate } from '../../utils/mail/templates';
import { generateRandomCode } from '../../utils/general';

const router = express.Router();

const saltRounds = 10;

router.post(
  '/register',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const body = req.body;

    if (!(body.firstName && body.lastName && body.email && body.password)) {
      res.status(400).send({ message: 'Please fill all required inputs' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Request does not contain all required body fields`
      );

      return;
    }

    // Check if user exists
    const oldUser = await User.findOne({ email: body.email });

    // Send error if user with exact email exists
    if (oldUser) {
      res.status(409).send({
        message: 'User Already Exists. Please Login.'
      });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : User Already Exists`
      );
      return;
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(body.password, saltRounds);

    // Generate confirmation codes
    const confirmationCode = generateRandomCode();

    // Created new user
    const user = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || '',
      password: encryptedPassword,
      confirmationCode: confirmationCode
    });

    // Save user in mongodb
    const createdUser = await user.save();

    // Create jwt token for created user
    const token = generateToken(createdUser);

    // Send verify email to user
    const verifyEmail = {
      from: 'NerdHub Kenya <NerdHubKenya@sandbox89dd7aa0a24e4a9ba739dc59f253ca24.mailgun.org>',
      to: `${user.firstName} ${user.lastName} <${user.email}>`,
      subject: `NerdHub Kenya - Verify Email`,
      html: mailGenerator.generate(confirmEmailTemplate(user, confirmationCode))
    };

    mg()
      .messages()
      .send(verifyEmail, (error, body) => {
        if (error) {
          logger.error(`Error: Verification email not sent. ${error}`);
        } else {
          logger.info(`Verification email sent. ${body}`);
        }
      });

    // Send user back to client in response
    res.status(200).send({
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      phone: createdUser.phone,
      isAdmin: createdUser.isAdmin,
      token: token
    });
  })
);

export default router;
