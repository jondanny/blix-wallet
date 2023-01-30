import { Module } from '@nestjs/common';
import { AdminWalletService } from './admin-wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminWalletRepository } from './admin-wallet.repository';
import { AdminWallet } from './admin-wallet.entity';
import { AdminWalletController } from './admin-wallet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdminWallet])],
  providers: [AdminWalletService, AdminWalletRepository],
  exports: [AdminWalletService],
  controllers: [AdminWalletController],
})
export class AdminWalletModule {}
