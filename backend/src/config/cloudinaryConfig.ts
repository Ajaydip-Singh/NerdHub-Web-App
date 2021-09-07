import cloudinary from 'cloudinary';
import { NextFunction, Request, Response } from 'express';

export const uploader = cloudinary.v2.uploader;

export const cloudinaryConfig = (
  _req: Request,
  _res: Response,
  next: NextFunction
): any => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  next();
};
