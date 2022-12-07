import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletExistsByUserUuidValidator } from './validators/wallet-exists-by-user-uuid.validator';
import { WalletNotExistsByUserUuidValidator } from './validators/wallet-not-exists-by-user-uuid.validator';
import { Wallet } from './wallet.entity';
import { WalletRepository } from './wallet.repository';
import { WalletService } from './wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [WalletService, WalletRepository, WalletExistsByUserUuidValidator, WalletNotExistsByUserUuidValidator],
  exports: [WalletService],
})
export class WalletModule {}
