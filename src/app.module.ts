import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvHelper } from './common/helpers/env.helper';
import web3Config from './config/web3.config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import redisConfig from './config/redis.config';
import { validate } from './common/validators/env.validator';
import { WalletModule } from './wallet/wallet.module';
import { Web3Module } from './web3/web3.module';
import { NftModule } from './nft/nft.module';
import { AdminWalletModule } from './admin-wallet/admin-wallet.module';

EnvHelper.verifyNodeEnv();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: EnvHelper.getEnvFilePath(),
      isGlobal: true,
      load: [appConfig, web3Config, databaseConfig, redisConfig],
      validate: validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get('databaseConfig');

        return {
          ...config,
          namingStrategy: new SnakeNamingStrategy(),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get('redisConfig.host'),
            port: configService.get('redisConfig.port'),
            password: configService.get('redisConfig.password'),
            tls: configService.get('redisConfig.tls'),
          },
        };
      },
      inject: [ConfigService],
    }),
    WalletModule,
    Web3Module,
    NftModule,
    AdminWalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
