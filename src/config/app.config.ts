import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV,
  adminApiPassword: process.env.ADMIN_API_PASSWORD,
  cryptoAlgorithm: process.env.CRYPTO_ALGORITHM,
  cipherKey: process.env.CIPHER_KEY,
  cipherIv: process.env.CIPHER_IV,
}));
