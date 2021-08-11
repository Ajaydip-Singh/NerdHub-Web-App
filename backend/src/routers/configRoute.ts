import express from 'express';
import logger from '../utils/logger';

const router = express.Router();

// Get endpoint to sent google client id to frontend
router.get('/config/google', (req, res) => {
  res.send(process.env.GOOGLE_CLIENT_ID);
  logger.info(
    `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Sent google client id to frontend`
  );
});

export default router;
