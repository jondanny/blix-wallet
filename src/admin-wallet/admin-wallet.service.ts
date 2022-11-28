import { Injectable } from '@nestjs/common';
import { AdminWalletRepository } from './admin-wallet.repository';
import { AdminWalletCreateValidationDto } from './dto/admin-wallet.create.validation.dto';
import { AdminWallet } from './admin-wallet.entity';
import { AdminWalletUsage } from './admin-wallet.types';

@Injectable()
export class AdminWalletService {
  constructor(private adminWalletRepository: AdminWalletRepository) {}

  async create(data: AdminWalletCreateValidationDto): Promise<AdminWallet> {
    return this.adminWalletRepository.save(data);
  }

  async setNotInUse(id: number) {
    await this.adminWalletRepository.update(id, { inUse: AdminWalletUsage.NotInUse });
  }

  async findFreeAndSetInUse(): Promise<AdminWallet> {
    return this.adminWalletRepository.findFreeAndSetInUse();
  }
}
