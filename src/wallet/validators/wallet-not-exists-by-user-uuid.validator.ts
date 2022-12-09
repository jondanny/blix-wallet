import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { WalletService } from '../wallet.service';

@ValidatorConstraint({ name: 'walletExistsByUserUuidValidator', async: true })
export class WalletNotExistsByUserUuidValidator implements ValidatorConstraintInterface {
  private userUuid: string;

  constructor(private readonly walletService: WalletService) {}

  async validate(userUuid: string, args: ValidationArguments): Promise<boolean> {
    this.userUuid = userUuid;

    const walletExists = await this.walletService.exists({ userUuid });

    return !Boolean(walletExists);
  }

  defaultMessage() {
    return `Wallet already exists for userUuid: ${this.userUuid}`;
  }
}
