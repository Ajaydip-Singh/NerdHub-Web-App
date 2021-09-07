import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface GetUserAuthInfoRequest extends Request {
  user?: JwtPayload | undefined | any;
}

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: {
    type: string;
    data: Array<number>;
  };
  size: number;
}

export interface FileRequest extends Request {
  file?: MulterFile | undefined | any;
}
