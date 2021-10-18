import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import LoginPageContent from '../../../models/loginPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const loginPageContent = await LoginPageContent.findOne();

    loginPageContent.mainHeading =
      req.body.mainHeading || loginPageContent.mainHeading;
    loginPageContent.mainBackgroundImage =
      req.body.mainBackgroundImage || loginPageContent.mainBackgroundImage;
    loginPageContent.mainBackgroundColor =
      req.body.mainBackgroundColor || loginPageContent.mainBackgroundColor;
    loginPageContent.inputBorderColor =
      req.body.inputBorderColor || loginPageContent.inputBorderColor;
    loginPageContent.inputBackgroundColor =
      req.body.inputBackgroundColor || loginPageContent.inputBackgroundColor;
    loginPageContent.inputTextColor =
      req.body.inputTextColor || loginPageContent.inputTextColor;
    loginPageContent.newAccountText =
      req.body.newAccountText || loginPageContent.newAccountText;
    loginPageContent.loginButtonBorderColor =
      req.body.loginButtonBorderColor ||
      loginPageContent.loginButtonBorderColor;
    loginPageContent.loginButtonBackgroundColor =
      req.body.loginButtonBackgroundColor ||
      loginPageContent.loginButtonBackgroundColor;
    loginPageContent.loginButtonTextColor =
      req.body.loginButtonTextColor || loginPageContent.loginButtonTextColor;
    loginPageContent.signUpLinkBorderColor =
      req.body.signUpLinkBorderColor || loginPageContent.signUpLinkBorderColor;
    loginPageContent.signUpLinkBackgroundColor =
      req.body.signUpLinkBackgroundColor ||
      loginPageContent.signUpLinkBackgroundColor;
    loginPageContent.signUpLinkTextColor =
      req.body.signUpLinkTextColor || loginPageContent.signUpLinkTextColor;

    const updatedloginPageContent = await loginPageContent.save();

    res.status(200).send(updatedloginPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated loginPageContent succesfully.`
    );
  })
);

export default router;
