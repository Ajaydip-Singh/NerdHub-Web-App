import express from 'express';
import getMembershipOrdersRoute from './getMembershipOrdersRoute';
import deleteMembershipOrderRoute from './deleteMembershipOrderRoute';
import createMembershipOrderRoute from './createMembershipOrderRoute';
import getUserMembershipOrdersRoute from './getUserMembershipOrdersRoute';

const router = express.Router();

router.use('/membership-orders', getMembershipOrdersRoute);
router.use('/membership-orders', getUserMembershipOrdersRoute);
router.use('/membership-orders', deleteMembershipOrderRoute);
router.use('/membership-orders', createMembershipOrderRoute);

export default router;