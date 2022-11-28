import { Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { WalletCreateValidationDto } from './dto/wallet.create.validation.dto';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}

  async create(data: WalletCreateValidationDto): Promise<Wallet> {
    return this.walletRepository.save(data);
  }

  async findByUserUuid(userUuid: string): Promise<Wallet> {
    return this.walletRepository.findOneBy({ userUuid });
  }

  async findByWalletAddress(walletAddress: string): Promise<Wallet> {
    return this.walletRepository.findOneBy({ walletAddress });
  }

  async exists(userUuid: string): Promise<boolean> {
    return this.walletRepository.exists(userUuid);
  }
}
