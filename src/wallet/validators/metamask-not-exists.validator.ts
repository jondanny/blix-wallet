import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { WalletService } from '../wallet.service';
import { WalletType } from '../wallet.types';

@ValidatorConstraint({ name: 'metamaskNotExistsValidator', async: true })
export class MetamaskNotExistsValidator implements ValidatorConstraintInterface {
  private userUuid: string;
  private errorMessage: string;

  constructor(private readonly walletService: WalletService) {}

  async validate(userUuid: string, args: ValidationArguments): Promise<boolean> {
    this.userUuid = userUuid;
    const blixExist = await this.walletService.exists({ userUuid });
    if (!blixExist) {
      this.errorMessage = `Not existing userUuid: ${this.userUuid}`;

      return false;
    }

    const metamaskExists = await this.walletService.exists({ userUuid, type: WalletType.Metamask });
    if (metamaskExists) {
      this.errorMessage = `Metamask wallet is already added for userUuid: ${this.userUuid}`;

      return false;
    }
  }

  defaultMessage() {
    return this.errorMessage;
  }
}
