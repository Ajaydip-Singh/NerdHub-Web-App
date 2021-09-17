import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { cloudinaryConfig } from '../../../config/cloudinaryConfig';
import cloudinary from 'cloudinary';

const router = express.Router();

router.get(
  '/',
  cloudinaryConfig,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const tag = req.query.tag || '';
    try {
      const images = await cloudinary.v2.api.resources_by_tag(tag as string);
      res.send(images);
    } catch (err) {
      res.status(404).send({ message: err });
    }
  })
);

export default router;
