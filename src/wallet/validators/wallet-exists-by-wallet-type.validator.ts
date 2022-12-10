import { NftCreateDto } from '@src/nft/dto/nft-create.dto';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { WalletService } from '../wallet.service';
import { WalletType } from '../wallet.types';

@ValidatorConstraint({ name: 'walletExistsByWalletTypeValidator', async: true })
export class WalletExistsByWalletTypeValidator implements ValidatorConstraintInterface {
  private userUuid: string;
  private walletType: WalletType;

  constructor(private readonly walletService: WalletService) {}

  async validate(walletType: WalletType, args: ValidationArguments): Promise<boolean> {
    const { userUuid } = args.object as NftCreateDto;

    this.userUuid = userUuid;
    this.walletType = walletType;

    const walletExists = await this.walletService.exists({ userUuid, type: walletType });

    return Boolean(walletExists);
  }

  defaultMessage() {
    return `${this.walletType} wallet is not found for userUuid: ${this.userUuid}`;
  }
}
