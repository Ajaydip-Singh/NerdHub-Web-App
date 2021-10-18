import express from 'express';
import getLoginPageContent from './getLoginPageContent';
import editLoginPageContent from './editLoginPageContent';

const router = express.Router();

router.use('/login-page-content', getLoginPageContent);
router.use('/login-page-content', editLoginPageContent);

export default router;
