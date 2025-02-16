import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
}

export const generateToken = (user: {id: number}) => {
  return jwt.sign({ userId: user.id}, 'your_secret_key', { expiresIn: '1h'});
}