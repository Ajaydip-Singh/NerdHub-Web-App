import express, { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../interfaces/express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../../utils/general';
import { mpesaConfig } from '../../config/mpesaConfig';
import axios from 'axios';

const router = express.Router();

router.post(
  '/pay',
  isAuth,
  mpesaConfig,
  expressAsyncHandler(async (req: GetUserAuthInfoRequest, res: Response) => {
    const shortCode = '174379';
    // const passKey = '13432';
    // const timeStamp = getTimeStamp();
    // const passwordBuffer = Buffer.from(shortCode + passKey + timeStamp);

    const requestBody = {
      BusinessShortCode: shortCode,
      Password:
        'MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3',
      Timestamp: '20160216165627',
      TransactionType: 'CustomerPayBillOnline',
      Amount: '1',
      PartyA: '254708374149',
      PartyB: '174379',
      PhoneNumber: '254708374149',
      CallBackURL: 'https://mydomain.com/pat',
      AccountReference: 'Test',
      TransactionDesc: 'Test'
    };

    try {
      const { data } = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        requestBody,
        {
          headers: {
            Authorization: req.access_token
          }
        }
      );
      res.send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

export default router;
