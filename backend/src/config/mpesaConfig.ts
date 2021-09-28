import axios from 'axios';
import { NextFunction, Response } from 'express';
import { MpesaRequest } from '../interfaces/express';

export const mpesaConfig = async (
  req: MpesaRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const credentials = `${process.env.MPESA_KEY}:${process.env.MPESA_SECRET}`;
  const buffer = Buffer.from(credentials);

  try {
    const { data } = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${buffer.toString('base64')}`
        }
      }
    );
    req.access_token = `Bearer ${data.access_token}`;
    next();
  } catch (err) {
    res.status(401).send({
      message: 'Authorizaton Failed.'
    });
  }
};
