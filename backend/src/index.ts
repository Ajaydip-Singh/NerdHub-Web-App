import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './utils/logger';

// Configure dotenv to use ev from .env
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
