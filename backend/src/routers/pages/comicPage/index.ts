import express from 'express';
import getComicPageContent from './getComicPageContent';
import editComicPageContent from './editComicPageContent';

const router = express.Router();

router.use('/comic-page-content', getComicPageContent);
router.use('/comic-page-content', editComicPageContent);

export default router;
