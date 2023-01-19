import { plainToInstance } from 'class-transformer';
import { IsEnum, IsIn, IsInt, IsString, Max, Min, MinLength, validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  @MinLength(1)
  TYPEORM_HOST: string;

  @IsInt()
  @Min(1)
  TYPEORM_PORT: number;

  @IsString()
  @MinLength(1)
  TYPEORM_PASSWORD: string;

  @IsString()
  @MinLength(1)
  TYPEORM_DATABASE: string;

  @IsString()
  @MinLength(1)
  TYPEORM_USERNAME: string;

  @IsString()
  @MinLength(1)
  TYPEORM_CONNECTION: string;

  @IsString()
  @MinLength(1)
  TYPEORM_MIGRATIONS: string;

  @IsString()
  @MinLength(1)
  TYPEORM_MIGRATIONS_DIR: string;

  @IsString()
  @MinLength(1)
  TYPEORM_LOGGING: string;

  @IsInt()
  @Min(10)
  TYPEORM_POOL_SIZE: number;

  @IsIn(['true', 'false'])
  MYSQL_TLS: string;

  @IsString()
  @MinLength(1)
  PROVIDER_URL: string;

  @IsString()
  @MinLength(1)
  ALCHEMY_API_KEY: string;

  @IsString()
  @MinLength(1)
  PRIVATE_KEY: string;

  @IsString()
  @MinLength(1)
  NETWORK: string;

  @IsString()
  @MinLength(1)
  REDIS_HOST: string;

  @IsInt()
  @Min(1)
  @Max(65536)
  REDIS_PORT: number;

  @IsIn(['true', 'false'])
  REDIS_TLS: string;

  @IsString()
  @MinLength(0)
  REDIS_USERNAME: string;

  @IsString()
  @MinLength(1)
  REDIS_PASSWORD: string;

  @IsString()
  @MinLength(1)
  ADMIN_API_PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
