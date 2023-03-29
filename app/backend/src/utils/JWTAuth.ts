import * as Jwt from 'jsonwebtoken';
import { IUsers } from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export const createJWT = (payload: Omit<IUsers, 'password'>) => {
  console.log(payload);
  return Jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d' });
};

export const verifyJWT = (token: string) => {
  console.log(token);
  return Jwt.verify(token, JWT_SECRET);
};
