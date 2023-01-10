import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { WalletModule } from '@src/wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nft } from './nft.entity';
import { NftRepository } from './nft.repository';
import { WalletExistsByUserUuidValidator } from '@src/wallet/validators/wallet-exists-by-user-uuid.validator';
import { NftExistsInBlixValidator } from './validators/nft-exists-in-blix.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Nft]), WalletModule],
  providers: [NftService, NftRepository, WalletExistsByUserUuidValidator, NftExistsInBlixValidator],
  controllers: [NftController],
  exports: [NftService],
})
export class NftModule {}
