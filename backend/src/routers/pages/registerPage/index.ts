import express from 'express';
import getRegisterPageContent from './getRegisterPageContent';
import editRegisterPageContent from './editRegisterPageContent';

const router = express.Router();

router.use('/register-page-content', getRegisterPageContent);
router.use('/register-page-content', editRegisterPageContent);

export default router;
