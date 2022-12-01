import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nft } from './nft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nft]), WalletModule],
  providers: [NftService],
  controllers: [NftController],
})
export class NftModule {}
