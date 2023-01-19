import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV,
  adminApiPassword: process.env.ADMIN_API_PASSWORD,
}));
