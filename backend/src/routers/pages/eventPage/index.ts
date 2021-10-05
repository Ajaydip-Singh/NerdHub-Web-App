import express from 'express';
import getEventPageContent from './getEventPageContent';
import editEventPageContent from './editEventPageContent';

const router = express.Router();

router.use('/event-page-content', getEventPageContent);
router.use('/event-page-content', editEventPageContent);

export default router;
