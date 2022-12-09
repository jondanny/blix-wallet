import { ApiProperty } from '@nestjs/swagger';
import { WalletExistsByUserUuidValidator } from '../../wallet/validators/wallet-exists-by-user-uuid.validator';
import { IsInt, IsString, MaxLength, MinLength, Validate } from 'class-validator';

export class NftTransferDto {
  @ApiProperty({ example: '279c0aba-cb39-4e2b-adf1-f0a9d42652ab', required: true, description: 'Uuid of Nft sender' })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  @Validate(WalletExistsByUserUuidValidator)
  userUuid: string;

  @ApiProperty({ example: 1, required: true, description: 'Token id of ERC721 Nft' })
  @IsInt()
  tokenId: number;
}
