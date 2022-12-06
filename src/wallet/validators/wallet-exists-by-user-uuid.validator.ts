import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { WalletService } from '../wallet.service';

@ValidatorConstraint({ name: 'walletExistsByUserUuidValidator', async: true })
export class WalletExistsByUserUuidValidator implements ValidatorConstraintInterface {
  constructor(private readonly walletService: WalletService) {}

  async validate(uuid: string, args: ValidationArguments): Promise<boolean> {
    const walletExists = await this.walletService.exists(uuid);

    return Boolean(walletExists);
  }

  defaultMessage() {
    return 'Wallet not found';
  }
}
