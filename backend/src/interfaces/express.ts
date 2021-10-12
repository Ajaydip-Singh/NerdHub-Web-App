import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface GetUserAuthInfoRequest extends Request {
  user?: JwtPayload | undefined | any;
  access_token?: string;
}

export interface MulterFile extends Request {
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
  file?: MulterFile | any;
  files?: MulterFile[] | any;
}

export interface MpesaRequest extends Request {
  access_token?: string;
}

export interface OrderItems {
  id: string;
  name: string;
  quantity: number;
  price: number;
  taxPrice: number;
  thumbnailImage: string;
}
