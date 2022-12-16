import { ApiProperty } from '@nestjs/swagger';
import { WalletNotExistsByUserUuidValidator } from '../../wallet/validators/wallet-not-exists-by-user-uuid.validator';
import { IsString, MaxLength, MinLength, Validate } from 'class-validator';

export class WalletCreateDto {
  @ApiProperty({
    example: 'RIQU3JFD2YM2LDxvxGHBNtfKDw12',
    required: true,
    description: 'Uuid of new wallet owner',
  })
  @IsString()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  @Validate(WalletNotExistsByUserUuidValidator)
  userUuid: string;
}
