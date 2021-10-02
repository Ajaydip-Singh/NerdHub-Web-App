import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Comic from '../../models/comicModel';
import logger from '../../utils/logger';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    // handle expected query parameters
    const pageSize = 5;
    const pageNumber = Number(req.query.pageNumber) || 1;

    const name = req.query.name || '';
    const category = req.query.category || '';
    const isActive = req.query.isActive || '';

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = category ? { category } : '';
    const isActiveFilter = isActive ? { isActive } : '';

    const count = await Comic.count({
      ...nameFilter,
      ...categoryFilter,
      ...isActiveFilter
    });

    const comics = await Comic.find({
      ...nameFilter,
      ...categoryFilter
    })
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize);

    if (comics.length !== 0) {
      res
        .status(200)
        .send({ comics, pageNumber, pages: Math.ceil(count / pageSize) });
      logger.info(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent comics.`
      );
    } else {
      res.status(404).send({ message: 'Comics Not Found' });
      logger.error(
        `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : No comics found.`
      );
    }
  })
);

export default router;
