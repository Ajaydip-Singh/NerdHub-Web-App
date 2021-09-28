import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { GetUserAuthInfoRequest } from '../interfaces/express';

// Create random code
export const generateRandomCode = (): string => {
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let code = '';
  for (let i = 0; i < 25; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }
  return code;
};

export const getTimeStamp = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  return (
    '' +
    year +
    (month < 10 ? '0' + month : month) +
    (day < 10 ? '0' + day : day) +
    (hh < 10 ? '0' + hh : hh) +
    (mm < 10 ? '0' + mm : mm) +
    (ss < 10 ? '0' + ss : ss)
  );
};

export const isAuth = (
  req: GetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): void => {
  // Get authorization header
  const authorization = req.headers.authorization;
  if (authorization) {
    // Get token sent from frontend
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No token' });
  }
};

export const isAdmin = (
  req: GetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
