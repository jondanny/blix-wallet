import { registerAs } from '@nestjs/config';

export default registerAs('redisConfig', () => ({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  dbNumber: process.env.REDIS_DB_NUMBER || 0,
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
}));
