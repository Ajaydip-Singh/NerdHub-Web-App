import express from 'express';
import getFooterContent from './getFooterContent';
import editFooterContent from './editFooterContent';

const router = express.Router();

router.use('/footer-content', getFooterContent);
router.use('/footer-content', editFooterContent);

export default router;
