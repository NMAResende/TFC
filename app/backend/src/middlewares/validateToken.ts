import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/JWTAuth';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = verifyJWT(authorization);
    req.body.decoded = decoded;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return next();
};

export default verifyToken;
