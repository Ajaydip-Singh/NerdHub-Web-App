import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface GetUserAuthInfoRequest extends Request {
  user: JwtPayload | undefined;
}
