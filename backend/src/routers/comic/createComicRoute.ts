import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Comic from '../../models/comicModel';
import { isAuth, isAdmin } from '../../utils/general';
import logger from '../../utils/logger';

const router = express.Router();

router.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const comic = new Comic({
      name: 'Sample Comic' + Date.now(),
      thumbnailImage: '/images/call_of_duty_ghosts.jpeg',
      description: 'Sample Comic Description',
      category: 'Sample Category',
      backgroundColor: '#50d450',
      borderColor: '#50d450'
    });

    const createdComic = await comic.save();

    res.send(createdComic);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Created new comic succesfully.`
    );
  })
);

export default router;
