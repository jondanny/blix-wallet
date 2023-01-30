import { Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { WalletCreateValidationDto } from './dto/wallet.create.validation.dto';
import { Wallet } from './wallet.entity';
import { WalletType } from './wallet.types';

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}

  async create(data: WalletCreateValidationDto): Promise<Wallet> {
    return this.walletRepository.save(data);
  }

  async findByUserUuidAndType(userUuid: string, type: WalletType): Promise<Wallet> {
    return this.walletRepository.findOneBy({ userUuid, type });
  }

  async findAllByUserUuid(userUuid: string): Promise<Wallet[]> {
    return this.walletRepository.find({ where: { userUuid } });
  }

  async findByWalletAddress(walletAddress: string): Promise<Wallet> {
    return this.walletRepository.findOneBy({ walletAddress });
  }

  async exists(param: Partial<Wallet>): Promise<boolean> {
    return this.walletRepository.exists(param);
  }
}
