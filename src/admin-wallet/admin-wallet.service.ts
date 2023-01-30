import { Injectable } from '@nestjs/common';
import { AdminWalletRepository } from './admin-wallet.repository';
import { AdminWalletCreateValidationDto } from './dto/admin-wallet.create.validation.dto';
import { AdminWallet } from './admin-wallet.entity';
import { AdminWalletUsage, BalanceStatus } from './admin-wallet.types';
import { encrypt } from '@src/common/utils/cipher';

@Injectable()
export class AdminWalletService {
  constructor(private adminWalletRepository: AdminWalletRepository) {}

  async create(data: AdminWalletCreateValidationDto): Promise<AdminWallet> {
    return this.adminWalletRepository.save(data);
  }

  async setNotInUse(id: number) {
    await this.adminWalletRepository.update(id, { inUse: AdminWalletUsage.NotInUse });
  }

  async findFreeEnoughAndSetInUse(): Promise<AdminWallet> {
    return this.adminWalletRepository.findFreeEnoughAndSetInUse();
  }

  async setBalanceOutOfMatic(walletAddress: string) {
    await this.adminWalletRepository.update({ walletAddress }, { balance: BalanceStatus.OutOfMatic });
  }

  async setBalanceEnough(walletAddress: string) {
    await this.adminWalletRepository.update({ walletAddress }, { balance: BalanceStatus.Enough });
  }

  async checkLowBalance() {
    return this.adminWalletRepository.countBy({ balance: BalanceStatus.OutOfMatic });
  }

  async findAccountWithNoMatic() {
    return this.adminWalletRepository.find({ select: ['walletAddress'], where: { balance: BalanceStatus.OutOfMatic } });
  }

  async encryptPrivateKeys() {
    const adminWallets = await this.adminWalletRepository.find();

    adminWallets.forEach(async (wallet) => {
      if (wallet.privateKey && wallet.privateKey.length < 68) {
        wallet.privateKey = encrypt(wallet.privateKey);
        console.log('wallet.privateKey:', wallet.privateKey);
        await this.adminWalletRepository.save(wallet);
      }
    });
  }
}
