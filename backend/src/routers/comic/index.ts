import express from 'express';
import comicsRoute from './comicsRoute';
import createComicRoute from './createComicRoute';
import comicsCategoriesRoute from './comicsCategoriesRoute';
import deleteComicRoute from './deleteComicRoute';
import getComicRoute from './getComicRoute';
import editComicRoute from './editComicRoute';

const comicRouter = express.Router();

comicRouter.use('/comics', comicsRoute);
comicRouter.use('/comics', createComicRoute);
comicRouter.use('/comics', comicsCategoriesRoute);
comicRouter.use('/comics', deleteComicRoute);
comicRouter.use('/comics', getComicRoute);
comicRouter.use('/comics', editComicRoute);

export default comicRouter;
