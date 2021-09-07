import multer from 'multer';
import DatauriParser from 'datauri/parser';
import path from 'path';
import { FileRequest } from '../interfaces/express';

const storage = multer.memoryStorage();

export const multerUploads = multer({ storage }).single('image');

const parser = new DatauriParser();

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
export const dataUri = (req: FileRequest): DatauriParser =>
  parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
