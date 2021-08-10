import mongoose from 'mongoose';
import logger from './utils/logger';

const DB_URL = process.env.MONGODB_URL || 'mongodb://localhost/nerdhub';

logger.info(`Starting mongodb connection at url ${DB_URL}`);

// Connect to mongodb
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

logger.info(
  `MongoDB connection state: ${mongoose.STATES[mongoose.connection.readyState]}`
);
