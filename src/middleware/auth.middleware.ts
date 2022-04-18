import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export const authToken = (
  req: Request,
  res: Response,
  next: NextFunction
): unknown => {
  try {
    const authHead: string | undefined = req.headers.authorization;
    const token: string = authHead ? authHead.split(' ')[1] : '';
    if (!authHead) {
      res.status(401);
      res.json('Access denied, invalid token');
      return false;
    }
    jwt.verify(token, config.token_secret as unknown as string);
    next();
  } catch (err) {
    return res.status(403).json('Access denied, invalid token');
  }
};
