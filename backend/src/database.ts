import mongoose from 'mongoose';
import logger from './utils/logger';

/* Initialize database using a connection string
 *
 * Inputs:
 *
 *   url - the connection string to the database
 *
 */
const initializeDatabase = (url: string): void => {
  logger.info(`Starting database connection at url ${url}`);

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => logger.info(`Connection to database succesful at ${url}`))
    .catch((err) =>
      logger.error(`Connection to database failed ${err.message}`)
    );
};

export default initializeDatabase;
