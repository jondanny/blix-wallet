import { ApiProperty } from '@nestjs/swagger';
import { WalletNotExistsByUserUuidValidator } from '../../wallet/validators/wallet-not-exists-by-user-uuid.validator';
import { IsString, IsUUID, Validate } from 'class-validator';

export class WalletCreateDto {
  @ApiProperty({
    example: '279c0aba-cb39-4e2b-adf1-f0a9d42652ab',
    required: true,
    description: 'Uuid of new wallet owner',
  })
  @IsString()
  @IsUUID()
  @Validate(WalletNotExistsByUserUuidValidator)
  userUuid: string;
}
