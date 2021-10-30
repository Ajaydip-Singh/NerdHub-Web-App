import express from 'express';
import getLandingPageContent from './getPostPaymentPageContent';
import editLandingPageContent from './editPostPaymentPageContent';

const router = express.Router();

router.use('/postPayment-page-content', getLandingPageContent);
router.use('/postPayment-page-content', editLandingPageContent);

export default router;
