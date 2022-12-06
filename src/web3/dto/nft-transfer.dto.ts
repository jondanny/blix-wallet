import { ApiProperty } from '@nestjs/swagger';
import { WalletExistsByUserUuidValidator } from '@src/wallet/validators/wallet-exists-by-user-uuid.validator';
import { IsEthereumAddress, IsInt, IsString, MaxLength, MinLength, Validate } from 'class-validator';

export class NftTransferDto {
  @ApiProperty({ example: '279c0aba-cb39-4e2b-adf1-f0a9d42652ab', required: true, description: 'Uuid of Nft sender' })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  @Validate(WalletExistsByUserUuidValidator)
  userUuidFrom: string;

  @ApiProperty({
    example: '0x2DE1918966c679aDF5bcb257bfD8588f011693EE',
    required: true,
    description: 'Wallet address of Nft receiver',
  })
  @IsString()
  @IsEthereumAddress()
  walletAddressTo: string;

  @ApiProperty({ example: 1, required: true, description: 'Token id of ERC721 Nft' })
  @IsInt()
  tokenId: number;
}
