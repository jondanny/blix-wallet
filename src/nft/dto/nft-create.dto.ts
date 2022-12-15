import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { WalletExistsByWalletTypeValidator } from '@src/wallet/validators/wallet-exists-by-wallet-type.validator';
import { WalletType } from '@src/wallet/wallet.types';

export class NftCreateDto {
  @ApiProperty({ example: 1, required: true, description: 'TokenId of Nft' })
  @IsInt()
  tokenId: number;

  @ApiProperty({
    example: 'RIQU3JFD2YM2LDxvxGHBNtfKDw12',
    required: true,
    description: 'Uuid of new wallet owner',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  userUuid: string;

  @ApiProperty({ example: 'blix', required: true, description: 'Destination wallet of minted Nft' })
  @IsIn(['blix', 'metamask'])
  @Validate(WalletExistsByWalletTypeValidator)
  walletType: WalletType;
}
