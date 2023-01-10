import { NftTransferDto } from '@src/web3/dto/nft-transfer.dto';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { NftService } from '../nft.service';
import { WalletType } from '../../wallet/wallet.types';

@ValidatorConstraint({ name: 'nftExistsInBlixValidator', async: true })
export class NftExistsInBlixValidator implements ValidatorConstraintInterface {
  private userUuid: string;
  private errorMessage: string;

  constructor(private readonly nftService: NftService) {}

  async validate(tokenId: string, args: ValidationArguments): Promise<boolean> {
    const { userUuid } = args.object as NftTransferDto;
    this.userUuid = userUuid;

    const nftExists = await this.nftService.exists({ userUuid, tokenId, walletType: WalletType.Blix });
    if (!nftExists) {
      this.errorMessage = `userUuid: ${this.userUuid} does not have NftId: ${tokenId}`;

      return false;
    }

    return true;
  }

  defaultMessage() {
    return this.errorMessage;
  }
}
