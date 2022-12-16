import { ApiProperty } from '@nestjs/swagger';
import { WalletExistsByUserUuidValidator } from '../../wallet/validators/wallet-exists-by-user-uuid.validator';
import { IsString, MaxLength, MinLength, Validate } from 'class-validator';

export class NftTransferDto {
  @ApiProperty({ example: 'RIQU3JFD2YM2LDxvxGHBNtfKDw12', required: true, description: 'Uuid of Nft sender' })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  @Validate(WalletExistsByUserUuidValidator)
  userUuid: string;

  @ApiProperty({
    example: 'ETHEREUM:0x4cd7f55756ac3d4c91d315329fb27297b9f4b12c:51',
    required: true,
    description: 'Token id of ERC721 Nft',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  tokenId: string;
}
