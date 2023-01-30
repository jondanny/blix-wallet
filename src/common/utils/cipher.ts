import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import { EnvHelper } from '../helpers/env.helper';

dotenv.config({ path: EnvHelper.getEnvFilePath() });

const algorithm = process.env.CRYPTO_ALGORITHM;
const key = Buffer.from(process.env.CIPHER_KEY);
const iv = Buffer.from(process.env.CIPHER_IV);

export const encrypt = (msg: string) => {
  if (!msg) return msg;

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(msg, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};

export const decrypt = (msg: string) => {
  if (!msg) return msg;

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(msg, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
