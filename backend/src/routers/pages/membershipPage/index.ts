import express from 'express';
import getMembershipPageContent from './getMembershipPageContent';
import editMembershipPageContent from './editMembershipPageContent';


const router = express.Router();

router.use('/membership-page-content', getMembershipPageContent);
router.use('/membership-page-content', editMembershipPageContent);

export default router;
