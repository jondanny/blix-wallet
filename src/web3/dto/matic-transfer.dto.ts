import { ApiProperty } from '@nestjs/swagger';
import { WalletExistsByUserUuidValidator } from '@src/wallet/validators/wallet-exists-by-user-uuid.validator';
import { IsEthereumAddress, IsNumber, IsUUID, Validate } from 'class-validator';

export class MaticTransferDto {
  @ApiProperty({ example: '279c0aba-cb39-4e2b-adf1-f0a9d42652ab', required: true, description: 'Uuid of sender' })
  @IsUUID()
  @Validate(WalletExistsByUserUuidValidator)
  userUuidFrom: string;

  @ApiProperty({
    example: '0x2DE1918966c679aDF5bcb257bfD8588f011693EE',
    required: true,
    description: 'Wallet address of receiver',
  })
  @IsEthereumAddress()
  walletAddressTo: string;

  @ApiProperty({ example: 0.1, required: true, description: 'Amount of Matic' })
  @IsNumber()
  amount: number;
}
