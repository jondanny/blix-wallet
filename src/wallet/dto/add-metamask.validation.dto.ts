import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsString, IsUUID, Validate } from 'class-validator';
import { MetamaskNotExistsValidator } from '@src/wallet/validators/metamask-not-exists.validator';
import { WalletNotExistsByAddressValidator } from '../validators/wallet-not-exists-by-address.validator copy';

export class AddMetamaskValidationDto {
  @ApiProperty({
    example: '279c0aba-cb39-4e2b-adf1-f0a9d42652ab',
    required: true,
    description: 'Uuid of new wallet owner',
  })
  @IsString()
  @IsUUID()
  @Validate(MetamaskNotExistsValidator)
  userUuid: string;

  @ApiProperty({
    example: '0x5E95F502AFAd175d0a18c0527Da790A3e3D0F85f',
    required: true,
    description: 'Metamask wallet address',
  })
  @IsEthereumAddress()
  @Validate(WalletNotExistsByAddressValidator)
  walletAddress: string;
}
