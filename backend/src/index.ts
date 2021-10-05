import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './utils/logger';
import routes from './routers';
import initializeDatabase from './database';
import path from 'path';

// Configure dotenv to use ev from .env
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure mongoose
const DB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/nerdhub';
initializeDatabase(DB_URL);

// Add all the routes
app.use('/api', routes);

// Middleware for async error handler
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    if (process.env.NODE_ENV !== 'production') {
      res.status(500).send({ message: err.message });
    } else {
      res.status(500).send("It's us not you. Try again later.");
    }
  }
);

app.use(express.static(path.join(__dirname, '/NerdHub-Frontend/build')));
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '/Nerdhub-Frontend/build/index.html'));
});

// app.get('/', (_req: Request, res: Response): void => {
//   res.send('Hello World');
//   logger.info(
//     `${_req.ip} : ${_req.method} : ${_req.originalUrl} : ${res.statusCode} : Server sent hello world`
//   );
// });

const port: number = Number(process.env.port) || 5000;

app.listen(port, () => {
  logger.info(`Server started listening at port: ${port}`);
});
