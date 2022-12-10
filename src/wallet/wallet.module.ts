import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletExistsByUserUuidValidator } from './validators/wallet-exists-by-user-uuid.validator';
import { MetamaskNotExistsValidator } from './validators/metamask-not-exists.validator';
import { WalletNotExistsByUserUuidValidator } from './validators/wallet-not-exists-by-user-uuid.validator';
import { WalletNotExistsByAddressValidator } from './validators/wallet-not-exists-by-address.validator copy';
import { Wallet } from './wallet.entity';
import { WalletRepository } from './wallet.repository';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletExistsByWalletTypeValidator } from './validators/wallet-exists-by-wallet-type.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [
    WalletService,
    WalletRepository,
    WalletExistsByUserUuidValidator,
    WalletNotExistsByUserUuidValidator,
    WalletNotExistsByAddressValidator,
    MetamaskNotExistsValidator,
    WalletExistsByWalletTypeValidator,
  ],
  exports: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
