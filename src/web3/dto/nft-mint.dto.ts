import { ApiProperty } from '@nestjs/swagger';
import { WalletExistsByUserUuidValidator } from '../../wallet/validators/wallet-exists-by-user-uuid.validator';
import { IsIn, IsInt, IsOptional, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { WalletExistsByWalletTypeValidator } from '@src/wallet/validators/wallet-exists-by-wallet-type.validator';
import { WalletType } from '@src/wallet/wallet.types';

export class NftMintDto {
  @ApiProperty({ example: 'RIQU3JFD2YM2LDxvxGHBNtfKDw12', required: true, description: 'Uuid of Nft sender' })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  @Validate(WalletExistsByUserUuidValidator)
  userUuid: string;

  @ApiProperty({ example: 'blix', required: true, description: 'Destination wallet of minted Nft' })
  @IsIn(['blix', 'metamask'])
  @Validate(WalletExistsByWalletTypeValidator)
  walletType: WalletType;

  @ApiProperty({
    example: 'https://nft.storage/ipfs/019shf893uhafiy9f2hu',
    required: false,
    description: 'MetadataUri of Nft',
  })
  @IsString()
  @IsOptional()
  metadataUri?: string;

  @ApiProperty({
    example: 'https://nft.storage/ipfs/019shf893uhafiy9f2hu',
    required: true,
    description: 'Royalty Fee percentage',
  })
  @IsInt()
  feeNumerator: number;
}
