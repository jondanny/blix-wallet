import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nft } from './nft.entity';
import { NftRepository } from './nft.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Nft]), WalletModule],
  providers: [NftService, NftRepository],
  controllers: [NftController],
  exports: [NftService],
})
export class NftModule {}
