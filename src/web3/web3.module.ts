import { Module } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { Web3Provider } from './web3.provider';
import { WalletModule } from 'src/wallet/wallet.module';
import { NftModule } from 'src/nft/nft.module';
import { Web3Controller } from './web3.controller';

@Module({
  imports: [WalletModule, NftModule],
  providers: [Web3Service, Web3Provider],
  controllers: [Web3Controller],
  exports: [Web3Service],
})
export class Web3Module {}
