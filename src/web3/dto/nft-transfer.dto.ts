import { ApiProperty } from '@nestjs/swagger';
import { WalletExistsByUserUuidValidator } from '../../wallet/validators/wallet-exists-by-user-uuid.validator';
import { IsInt, IsString, MaxLength, MinLength, Validate } from 'class-validator';

export class NftTransferDto {
  @ApiProperty({ example: 'RIQU3JFD2YM2LDxvxGHBNtfKDw12', required: true, description: 'Uuid of Nft sender' })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  @Validate(WalletExistsByUserUuidValidator)
  userUuid: string;

  @ApiProperty({ example: 1, required: true, description: 'Token id of ERC721 Nft' })
  @IsInt()
  tokenId: number;
}
