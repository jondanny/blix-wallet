import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvHelper } from './common/helpers/env.helper';
import web3Config from './config/web3.config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { validate } from './common/validators/env.validator';
import { WalletModule } from './wallet/wallet.module';
import { Web3Module } from './web3/web3.module';
import { NftModule } from './nft/nft.module';
import { TransactionMaticModule } from './transaction-matic/transaction-matic.module';
import { TransactionNftModule } from './transaction-nft/transaction-nft.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


EnvHelper.verifyNodeEnv();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: '/swagger',
    }),
    ConfigModule.forRoot({
      envFilePath: EnvHelper.getEnvFilePath(),
      isGlobal: true,
      load: [appConfig, web3Config, databaseConfig],
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
    WalletModule,
    Web3Module,
    NftModule,
    TransactionMaticModule,
    TransactionNftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
