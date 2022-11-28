import { IsNotEmpty, IsString } from 'class-validator';

export class WalletCreateValidationDto {
  @IsNotEmpty()
  @IsString()
  userUuid: string;

  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @IsNotEmpty()
  @IsString()
  privateKey: string;
}
