import express from 'express';
import getContactPageContent from './getContactPageContent';
import editContactPageContent from './editContactPageContent';


const router = express.Router();

router.use('/contact-page-content', getContactPageContent);
router.use('/contact-page-content', editContactPageContent);

export default router;
