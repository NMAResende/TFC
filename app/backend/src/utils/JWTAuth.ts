import * as Jwt from 'jsonwebtoken';
import { IUserLogin } from '../interfaces/IUserLogin';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export const createJWT = (payload: IUserLogin) => {
  console.log(payload);
  return Jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d' });
};

export const verifyJWT = (token: string) => {
  console.log(token);
  return Jwt.verify(token, JWT_SECRET);
};
