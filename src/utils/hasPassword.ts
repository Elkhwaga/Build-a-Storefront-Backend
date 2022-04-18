import config from '../config';
import bcrypt from 'bcrypt';

export const hashPassword = (password: string): string => {
  const salt: number = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};
