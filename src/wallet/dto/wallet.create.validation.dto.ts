import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WalletType } from '../wallet.types';

export class WalletCreateValidationDto {
  @IsNotEmpty()
  @IsString()
  userUuid: string;

  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @IsOptional()
  @IsString()
  privateKey?: string;

  @IsNotEmpty()
  @IsIn(['blix', 'metamask'])
  type: WalletType;
}
