import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { WalletService } from '../wallet.service';
import { WalletType } from '../wallet.types';

@ValidatorConstraint({ name: 'metamaskNotExistsValidator', async: true })
export class MetamaskNotExistsValidator implements ValidatorConstraintInterface {
  private userUuid: string;

  constructor(private readonly walletService: WalletService) {}

  async validate(userUuid: string, args: ValidationArguments): Promise<boolean> {
    this.userUuid = userUuid;
    const blixExist = await this.walletService.exists({ userUuid });
    if (!blixExist) return false;

    const metamaskExists = await this.walletService.exists({ userUuid, type: WalletType.Metamask });

    return !Boolean(metamaskExists);
  }

  defaultMessage() {
    return `Metamask wallet is already added for userUuid: ${this.userUuid}`;
  }
}
