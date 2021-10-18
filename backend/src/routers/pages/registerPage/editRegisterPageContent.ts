import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import RegisterPageContent from '../../../models/registerPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const registerPageContent = await RegisterPageContent.findOne();

    registerPageContent.mainHeading =
      req.body.mainHeading || registerPageContent.mainHeading;
    registerPageContent.mainBackgroundImage =
      req.body.mainBackgroundImage || registerPageContent.mainBackgroundImage;
    registerPageContent.mainBackgroundColor =
      req.body.mainBackgroundColor || registerPageContent.mainBackgroundColor;
    registerPageContent.inputBorderColor =
      req.body.inputBorderColor || registerPageContent.inputBorderColor;
    registerPageContent.inputBackgroundColor =
      req.body.inputBackgroundColor || registerPageContent.inputBackgroundColor;
    registerPageContent.inputTextColor =
      req.body.inputTextColor || registerPageContent.inputTextColor;
    registerPageContent.newAccountText =
      req.body.newAccountText || registerPageContent.newAccountText;
    registerPageContent.registerButtonBorderColor =
      req.body.registerButtonBorderColor ||
      registerPageContent.registerButtonBorderColor;
    registerPageContent.registerButtonBackgroundColor =
      req.body.registerButtonBackgroundColor ||
      registerPageContent.registerButtonBackgroundColor;
    registerPageContent.registerButtonTextColor =
      req.body.registerButtonTextColor || registerPageContent.registerButtonTextColor;
    registerPageContent.signUpLinkBorderColor =
      req.body.signUpLinkBorderColor || registerPageContent.signUpLinkBorderColor;
    registerPageContent.signUpLinkBackgroundColor =
      req.body.signUpLinkBackgroundColor ||
      registerPageContent.signUpLinkBackgroundColor;
    registerPageContent.signUpLinkTextColor =
      req.body.signUpLinkTextColor || registerPageContent.signUpLinkTextColor;

    const updatedregisterPageContent = await registerPageContent.save();

    res.status(200).send(updatedregisterPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated registerPageContent succesfully.`
    );
  })
);

export default router;
