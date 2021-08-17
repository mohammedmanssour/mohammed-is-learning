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

export const hash = (str: string): string => {
  const secret =
    '7c32d31dbdd39f2111da0b1dea59e94f3ed715fd8cdf0ca3ecf354ca1a2e3e30';
  return crypto.createHmac('sha256', secret).update(str).digest('hex');
};
