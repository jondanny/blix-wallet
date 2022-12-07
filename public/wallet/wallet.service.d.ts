import { WalletRepository } from './wallet.repository';
import { WalletCreateValidationDto } from './dto/wallet.create.validation.dto';
import { Wallet } from './wallet.entity';
export declare class WalletService {
    private walletRepository;
    constructor(walletRepository: WalletRepository);
    create(data: WalletCreateValidationDto): Promise<Wallet>;
    findByUserUuid(userUuid: string): Promise<Wallet>;
    findByWalletAddress(walletAddress: string): Promise<Wallet>;
    exists(userUuid: string): Promise<boolean>;
}
