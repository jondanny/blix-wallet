import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
import { Web3Service } from './web3.service';
import { Web3Provider } from './web3.provider';
import { WalletModule } from '@src/wallet/wallet.module';
import { NftModule } from '@src/nft/nft.module';
import { Web3Controller } from './web3.controller';
import { AdminWalletModule } from '@src/admin-wallet/admin-wallet.module';
import { Web3Consumer } from './web3.consumer';

@Module({
  imports: [
    WalletModule,
    NftModule,
    AdminWalletModule,
    BullModule.registerQueue({
      name: 'web3-queue',
      processors: [join(__dirname, 'processor.js')],
    }),
  ],
  providers: [Web3Service, Web3Consumer, Web3Provider],
  controllers: [Web3Controller],
  exports: [Web3Service],
})
export class Web3Module {}
