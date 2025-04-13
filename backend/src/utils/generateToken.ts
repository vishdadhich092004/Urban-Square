import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

/**
 * Generate JWT token for authentication
 * @param id User ID to encode in the token
 * @returns JWT token string
 */
const generateToken = (id: string | Types.ObjectId): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export default generateToken;
