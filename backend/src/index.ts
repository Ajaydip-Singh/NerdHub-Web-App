import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './utils/logger';
import userRouter from './routers/user';
import initializeDatabase from './database';

// Configure dotenv to use ev from .env
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure mongoose
const DB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/nerdhub';
initializeDatabase(DB_URL);

app.use('/api', userRouter);

// Middleware for async error handler
app.use((err: Error, _req: Request, res: Response, _next: Function): void => {
  if (process.env.NODE_ENV !== 'production') {
    res.status(500).send({ message: err.message });
  } else {
    res.status(500).send("It's us not you. Try again later.");
  }
});

app.get('/', (_req: Request, res: Response): void => {
  res.send('Hello World');
  logger.info(
    `${_req.ip} : ${_req.method} : ${_req.originalUrl} : ${res.statusCode} : Server sent hello world`
  );
});

const port: number = Number(process.env.port) || 5000;

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
  logger.info(`Server started listening at port: ${port}`);
});
