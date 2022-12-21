import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { MetamaskNotExistsValidator } from '@src/wallet/validators/metamask-not-exists.validator';
import { WalletNotExistsByAddressValidator } from '../validators/wallet-not-exists-by-address.validator';

export class AddMetamaskValidationDto {
  @ApiProperty({
    example: 'RIQU3JFD2YM2LDxvxGHBNtfKDw12',
    required: true,
    description: 'Uuid of new wallet owner',
  })
  @IsString()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
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
