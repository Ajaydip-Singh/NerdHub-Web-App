import multer from 'multer';
import DatauriParser from 'datauri/parser';
import path from 'path';
import { FileRequest } from '../interfaces/express';

const storage = multer.memoryStorage();

export const multerSingleUpload = multer({ storage }).single('image');

export const multerMultipleUpload = multer({ storage }).array('images', 5);

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

export const multipleDataUri = (req: FileRequest): string[] => {
  const data: string[] = [];
  for (let i = 0; i < req.files.length; i++) {
    const data_url = parser.format(
      path.extname(req.files[i].originalname).toString(),
      req.files[i].buffer
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    data.push(data_url.content!);
  }
  return data;
};
