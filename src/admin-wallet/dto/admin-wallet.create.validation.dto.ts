import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { AdminWalletUsage } from '../admin-wallet.types';

export class AdminWalletCreateValidationDto {
  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @IsNotEmpty()
  @IsString()
  privateKey: string;

  @IsNotEmpty()
  @IsIn(['NotInUse', 'InUse'])
  inUse: AdminWalletUsage;
}
