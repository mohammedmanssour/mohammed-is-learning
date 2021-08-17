import crypto from 'crypto';

export const uniqueId = (prefix?: string): string => {
  return '_' + (prefix || '') + Math.random().toString(36).substr(2, 9);
};

export const base64UrlEncode = (str: string): string => {
  const cleaned = str.replace('+', '').replace('/', '_').replace('=', '');
  return Buffer.from(cleaned).toString('base64');
};

export const base64UrlDecode = (str: string): string => {
  return Buffer.from(str, 'base64').toString('ascii');
};

export const hash = (str: string, secret: string): string => {
  return crypto.createHmac('sha256', secret).update(str).digest('hex');
};
