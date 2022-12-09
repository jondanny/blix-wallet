import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { WalletService } from '../wallet.service';

@ValidatorConstraint({ name: 'walletNotExistsByAddressValidator', async: true })
export class WalletNotExistsByAddressValidator implements ValidatorConstraintInterface {
  private walletAddress: string;

  constructor(private readonly walletService: WalletService) {}

  async validate(walletAddress: string, args: ValidationArguments): Promise<boolean> {
    this.walletAddress = walletAddress;

    const walletExists = await this.walletService.exists({ walletAddress });

    return !Boolean(walletExists);
  }

  defaultMessage() {
    return `Wallet: ${this.walletAddress} already exists`;
  }
}
