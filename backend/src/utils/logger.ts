import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    // - Write all logs error (and below) to `error.log`.
    new transports.File({
      filename: 'logs/error.log',
      level: 'error'
    })
  ]
});

// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}

export default logger;
