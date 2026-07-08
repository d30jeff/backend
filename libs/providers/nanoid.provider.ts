/**
 * NanoID implementation
 *
 * To calculate the probability of collisions please refer to:
 * @see https://zelark.github.io/nano-id-cc/
 */
import { customAlphabet } from 'nanoid';

const AVAILABLE =
  '01234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateID = (prefix: string, length = 10): string => {
  const ID = customAlphabet(AVAILABLE, length)();
  return `${prefix}_${ID}`;
};

export const generateToken = (length = 128): string => {
  return customAlphabet(AVAILABLE, length)();
};

export const generateOTP = (length = 6): string => {
  return customAlphabet('1234567890', length)();
};
