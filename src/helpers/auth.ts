import jwt from 'jsonwebtoken';
import { IUser } from '@/models/user';

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (user: IUser) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: string; role: 'admin' | 'user' };
};